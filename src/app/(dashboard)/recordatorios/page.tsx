import { BellRing } from "lucide-react";
import { addDays } from "date-fns";
import { auth } from "@/auth";

export default async function RecordatoriosPage() {
  await auth();
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

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recordatorios</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Alertas y próximas obligaciones</h2>
      </div>

      <div className="space-y-3">
        {reminders.map((item) => (
          <article key={item.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mt-0.5 rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <BellRing size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Vence: {new Date(item.dueDate).toLocaleDateString("es-ES")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
