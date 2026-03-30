"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

type MonthlyPoint = {
  mes: string;
  ingresos: number;
  gastos: number;
};

export function MonthlyOverviewChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="h-[320px] w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-200">Evolución mensual</p>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C896" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#00C896" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A2540" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#0A2540" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d6dbe2" />
          <XAxis dataKey="mes" tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
          <Area type="monotone" dataKey="ingresos" stroke="#00C896" fill="url(#income)" strokeWidth={2.6} />
          <Area type="monotone" dataKey="gastos" stroke="#0A2540" fill="url(#expense)" strokeWidth={2.6} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
