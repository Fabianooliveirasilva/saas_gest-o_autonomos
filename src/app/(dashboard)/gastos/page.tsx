import { auth } from "@/auth";
import { ExpenseForm } from "@/components/forms/expense-form";
import { toNumber } from "@/lib/number";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function GastosPage() {
  const session = await auth();
  const expenses = await prisma.expense.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gastos</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Control de gastos</h2>
      </div>

      <ExpenseForm />

      <div className="grid gap-3 md:grid-cols-2">
        {expenses.map((expense) => (
          <article key={expense.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{expense.description}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">{expense.createdAt.toLocaleDateString("es-ES")}</p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{formatCurrency(toNumber(expense.amount))}</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{expense.category}</span>
              {expense.receiptUrl && (
                <a href={expense.receiptUrl} target="_blank" className="text-slate-500 underline hover:text-slate-700 dark:text-slate-300" rel="noreferrer">
                  Ver recibo
                </a>
              )}
            </div>
          </article>
        ))}
        {expenses.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-300">Aún no hay gastos registrados.</p>}
      </div>
    </section>
  );
}
