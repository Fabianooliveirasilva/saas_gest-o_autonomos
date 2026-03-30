import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { auth } from "@/auth";
import { toNumber } from "@/lib/number";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 0, y: 770, width: 595, height: 72, color: rgb(0.04, 0.15, 0.25) });
  page.drawText("FacturaFácil", { x: 40, y: 800, size: 26, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Factura", { x: 460, y: 800, size: 16, font: font, color: rgb(1, 1, 1) });

  const amount = toNumber(invoice.amount);
  const ivaPercent = toNumber(invoice.ivaPercent);
  const irpfPercent = toNumber(invoice.irpfPercent);
  const total = toNumber(invoice.total);

  const lines = [
    `N. Factura: ${invoice.invoiceNumber}`,
    `Cliente: ${invoice.clientName}`,
    `CIF/NIF: ${invoice.cifNif}`,
    `Base imponible: ${amount.toFixed(2)} EUR`,
    `IVA (${ivaPercent}%): ${((amount * ivaPercent) / 100).toFixed(2)} EUR`,
    `IRPF (${irpfPercent}%): ${((amount * irpfPercent) / 100).toFixed(2)} EUR`,
    `TOTAL: ${total.toFixed(2)} EUR`,
    `Fecha: ${invoice.createdAt.toLocaleDateString("es-ES")}`,
  ];

  let y = 700;
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: 40,
      y,
      size: index === lines.length - 2 ? 18 : 13,
      font: index === lines.length - 2 ? bold : font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 36;
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=factura-${invoice.id}.pdf`,
    },
  });
}
