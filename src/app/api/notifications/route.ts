import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const reminders = [
    {
      id: "1",
      title: "Presentación trimestral de IVA",
      message: "Recuerda presentar el modelo 303 antes de la fecha límite.",
      dueDate: addDays(new Date(), 7).toISOString(),
    },
    {
      id: "2",
      title: "Retenciones IRPF",
      message: "Revisa tus retenciones para evitar ajustes inesperados.",
      dueDate: addDays(new Date(), 12).toISOString(),
    },
  ];

  return NextResponse.json(reminders);
}
