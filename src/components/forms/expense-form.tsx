"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["herramientas", "alquiler", "comida", "transporte", "marketing", "otros"];

export function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: Number(amount),
        category: category || undefined,
        receiptUrl: receiptUrl || undefined,
      }),
    });

    setLoading(false);
    setDescription("");
    setAmount("");
    setCategory("");
    setReceiptUrl("");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
      <input required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del gasto" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <input required type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Importe" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700">
        <option value="">Categoría automática (IA mock)</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input value={receiptUrl} onChange={(e) => setReceiptUrl(e.target.value)} placeholder="URL del recibo (opcional)" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-slate-700" />
      <button disabled={loading} className="md:col-span-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123f66] disabled:opacity-60">
        {loading ? "Guardando..." : "Añadir gasto"}
      </button>
    </form>
  );
}
