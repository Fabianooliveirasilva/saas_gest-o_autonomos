import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTaxSummary } from "@/services/finance-service";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const summary = await getTaxSummary(session.user.id);
  return NextResponse.json(summary);
}
