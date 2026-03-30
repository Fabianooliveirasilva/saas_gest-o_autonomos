const plans = [
  {
    name: "Starter",
    price: "0 EUR",
    description: "Para empezar a facturar",
    features: ["Hasta 10 facturas/mes", "Dashboard básico", "Recordatorios fiscales"],
  },
  {
    name: "Pro",
    price: "19 EUR/mes",
    description: "Para autónomos en crecimiento",
    features: ["Facturas ilimitadas", "PDF avanzado", "Soporte prioritario"],
    featured: true,
  },
  {
    name: "Studio",
    price: "49 EUR/mes",
    description: "Para equipos y asesorías",
    features: ["Multiusuario", "Automatizaciones", "Exportación contable"],
  },
];

export default function PlanesPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planes</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Suscripciones</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl border p-5 ${
              plan.featured
                ? "border-emerald-400 bg-emerald-50/70 shadow-lg shadow-emerald-500/10 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            }`}
          >
            <p className="text-sm text-slate-500 dark:text-slate-300">{plan.description}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123f66]">
              Elegir plan (Stripe mock)
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
