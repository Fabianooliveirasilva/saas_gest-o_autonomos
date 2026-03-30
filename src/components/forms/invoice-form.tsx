"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function InvoiceForm() {
  const [clientName, setClientName] = useState("");
  const [cifNif, setCifNif] = useState("");
  const [amount, setAmount] = useState("");
  const [ivaPercent, setIvaPercent] = useState("21");
  const [irpfPercent, setIrpfPercent] = useState("15");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = useMemo(() => {
    const base = Number(amount) || 0;
    const iva = (base * Number(ivaPercent || 0)) / 100;
    const irpf = (base * Number(irpfPercent || 0)) / 100;
    return base + iva - irpf;
  }, [amount, ivaPercent, irpfPercent]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        cifNif,
        amount: Number(amount),
        ivaPercent: Number(ivaPercent),
        irpfPercent: Number(irpfPercent),
      }),
    });

    setLoading(false);
    setClientName("");
    setCifNif("");
    setAmount("");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
      <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Cliente" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <input required value={cifNif} onChange={(e) => setCifNif(e.target.value)} placeholder="CIF/NIF" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <input required type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Importe base" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <input required type="number" min="0" max="100" value={ivaPercent} onChange={(e) => setIvaPercent(e.target.value)} placeholder="IVA %" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <input required type="number" min="0" max="100" value={irpfPercent} onChange={(e) => setIrpfPercent(e.target.value)} placeholder="IRPF %" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <div className="flex items-center justify-between rounded-xl border border-dashed border-emerald-300 bg-emerald-50/60 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
        <span>Total estimado</span>
        <strong>{new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(total)}</strong>
      </div>
      <button disabled={loading} className="md:col-span-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123f66] disabled:opacity-60">
        {loading ? "Guardando..." : "Crear factura"}
      </button>
    </form>
  );
}
