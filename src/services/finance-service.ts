import { subMonths } from "date-fns";
import { toNumber } from "@/lib/number";
import { prisma } from "@/lib/prisma";

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date);
}

export async function getDashboardData(userId: string) {
  const [invoices, expenses] = await Promise.all([
    prisma.invoice.findMany({ where: { userId }, orderBy: { createdAt: "asc" } }),
    prisma.expense.findMany({ where: { userId }, orderBy: { createdAt: "asc" } }),
  ]);

  const totalIncome = invoices.reduce((acc, item) => acc + toNumber(item.total), 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + toNumber(item.amount), 0);
  const netProfit = totalIncome - totalExpenses;

  const monthlyMap = new Map<string, { mes: string; ingresos: number; gastos: number }>();

  for (let i = 5; i >= 0; i -= 1) {
    const date = subMonths(new Date(), i);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    monthlyMap.set(key, { mes: getMonthLabel(date), ingresos: 0, gastos: 0 });
  }

  invoices.forEach((invoice) => {
    const key = `${invoice.createdAt.getFullYear()}-${invoice.createdAt.getMonth()}`;
    const month = monthlyMap.get(key);
    if (month) month.ingresos += toNumber(invoice.total);
  });

  expenses.forEach((expense) => {
    const key = `${expense.createdAt.getFullYear()}-${expense.createdAt.getMonth()}`;
    const month = monthlyMap.get(key);
    if (month) month.gastos += toNumber(expense.amount);
  });

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    monthlyData: Array.from(monthlyMap.values()),
  };
}

export async function getTaxSummary(userId: string) {
  const [invoices, expenses] = await Promise.all([
    prisma.invoice.findMany({ where: { userId } }),
    prisma.expense.findMany({ where: { userId } }),
  ]);

  const ivaRepercutido = invoices.reduce((acc, item) => acc + (toNumber(item.amount) * toNumber(item.ivaPercent)) / 100, 0);
  const ivaSoportado = expenses.reduce((acc, item) => acc + toNumber(item.amount) * 0.21, 0);
  const ivaResultado = ivaRepercutido - ivaSoportado;

  const irpfRetenido = invoices.reduce((acc, item) => acc + (toNumber(item.amount) * toNumber(item.irpfPercent)) / 100, 0);

  return {
    ivaRepercutido,
    ivaSoportado,
    ivaResultado,
    irpfRetenido,
  };
}

export function suggestCategory(description: string) {
  const text = description.toLowerCase();
  if (text.includes("software") || text.includes("saas") || text.includes("hosting")) return "herramientas";
  if (text.includes("alquiler") || text.includes("oficina")) return "alquiler";
  if (text.includes("tren") || text.includes("taxi") || text.includes("gasolina")) return "transporte";
  if (text.includes("comida") || text.includes("restaurante")) return "comida";
  return "otros";
}
