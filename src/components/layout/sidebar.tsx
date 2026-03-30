"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FileText, LayoutDashboard, LogOut, Receipt, Bell, Calculator, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/panel", label: "Panel", icon: LayoutDashboard },
  { href: "/facturas", label: "Facturas", icon: FileText },
  { href: "/gastos", label: "Gastos", icon: Receipt },
  { href: "/impuestos", label: "Impuestos", icon: Calculator },
  { href: "/recordatorios", label: "Recordatorios", icon: Bell },
  { href: "/planes", label: "Planes", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mb-8 rounded-2xl bg-[linear-gradient(135deg,#0A2540_0%,#123f66_60%,#00C896_100%)] p-5 text-white shadow-xl shadow-emerald-900/10">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-100">SaaS</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight">FacturaFácil</h2>
        <p className="mt-2 text-sm text-slate-100">Tu oficina financiera digital en España.</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-slate-900 text-white shadow-md dark:bg-emerald-500 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/iniciar-sesion" })}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-rose-400/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
      >
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </aside>
  );
}
