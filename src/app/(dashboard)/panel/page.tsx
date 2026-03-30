import { auth } from "@/auth";
import { MonthlyOverviewChart } from "@/components/charts/monthly-overview-chart";
import { formatCurrency } from "@/lib/utils";
import { getDashboardData } from "@/services/finance-service";

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-300">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}

export default async function PanelPage() {
  const session = await auth();
  const data = await getDashboardData(session!.user.id);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Panel</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Resumen financiero</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Ingresos totales" value={formatCurrency(data.totalIncome)} />
        <SummaryCard title="Gastos totales" value={formatCurrency(data.totalExpenses)} />
        <SummaryCard title="Beneficio neto" value={formatCurrency(data.netProfit)} />
      </div>

      <MonthlyOverviewChart data={data.monthlyData} />

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
        Próximo hito fiscal: revisa tu liquidación de IVA para evitar sorpresas a final de trimestre.
      </div>
    </section>
  );
}
