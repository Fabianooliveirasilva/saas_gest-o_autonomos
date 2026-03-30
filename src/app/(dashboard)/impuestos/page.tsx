import { auth } from "@/auth";
import { formatCurrency } from "@/lib/utils";
import { getTaxSummary } from "@/services/finance-service";

function TaxCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-300">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}

export default async function ImpuestosPage() {
  const session = await auth();
  const summary = await getTaxSummary(session!.user.id);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Impuestos</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Calculadora fiscal automática</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TaxCard title="IVA repercutido" value={formatCurrency(summary.ivaRepercutido)} />
        <TaxCard title="IVA soportado" value={formatCurrency(summary.ivaSoportado)} />
        <TaxCard title="Resultado IVA" value={formatCurrency(summary.ivaResultado)} />
        <TaxCard title="IRPF retenido" value={formatCurrency(summary.irpfRetenido)} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <p className="font-semibold">Resumen mensual</p>
        <p className="mt-2">Este cálculo es orientativo para autónomos en España. Te recomendamos revisar modelos oficiales con tu asesoría antes de presentar impuestos.</p>
      </div>
    </section>
  );
}
