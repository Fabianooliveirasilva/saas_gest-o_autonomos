import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit } from "@/lib/rate-limit";
import { roundMoney } from "@/lib/number";

const invoiceSchema = z.object({
  clientName: z.string().min(2),
  cifNif: z.string().min(5),
  amount: z.number().positive(),
  ivaPercent: z.number().min(0).max(100),
  irpfPercent: z.number().min(0).max(100),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const limit = consumeRateLimit(req, `invoice:create:${session.user.id}`, 60, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = invoiceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { amount, ivaPercent, irpfPercent, clientName, cifNif } = parsed.data;
  const baseAmount = roundMoney(amount);
  const ivaValue = roundMoney((baseAmount * ivaPercent) / 100);
  const irpfValue = roundMoney((baseAmount * irpfPercent) / 100);
  const total = roundMoney(baseAmount + ivaValue - irpfValue);

  const invoice = await prisma.$transaction(async (tx) => {
    const lastInvoice = await tx.invoice.findFirst({
      where: { userId: session.user.id },
      orderBy: { sequence: "desc" },
      select: { sequence: true },
    });

    const sequence = (lastInvoice?.sequence ?? 0) + 1;
    const series = `FF-${new Date().getFullYear()}`;
    const invoiceNumber = `${series}-${String(sequence).padStart(6, "0")}`;

    return tx.invoice.create({
      data: {
        userId: session.user.id,
        clientName,
        cifNif,
        series,
        sequence,
        invoiceNumber,
        amount: baseAmount,
        ivaPercent,
        irpfPercent,
        total,
      },
    });
  });

  return NextResponse.json(invoice, { status: 201 });
}
