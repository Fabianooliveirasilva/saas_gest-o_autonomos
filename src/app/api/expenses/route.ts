import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { roundMoney } from "@/lib/number";
import { consumeRateLimit } from "@/lib/rate-limit";
import { suggestCategory } from "@/services/finance-service";

const expenseSchema = z.object({
  description: z.string().min(2),
  category: z.string().optional(),
  amount: z.number().positive(),
  receiptUrl: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const expenses = await prisma.expense.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const limit = consumeRateLimit(req, `expense:create:${session.user.id}`, 120, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = expenseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const expense = await prisma.expense.create({
    data: {
      userId: session.user.id,
      description: parsed.data.description,
      amount: roundMoney(parsed.data.amount),
      category: parsed.data.category || suggestCategory(parsed.data.description),
      receiptUrl: parsed.data.receiptUrl || null,
    },
  });

  return NextResponse.json(expense, { status: 201 });
}
