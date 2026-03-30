"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Receipt, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/panel", label: "Panel", icon: LayoutDashboard },
  { href: "/facturas", label: "Facturas", icon: FileText },
  { href: "/gastos", label: "Gastos", icon: Receipt },
  { href: "/impuestos", label: "Impuestos", icon: Calculator },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 z-10 grid grid-cols-4 gap-2 border-b border-slate-200 bg-white/90 px-3 py-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/90">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] font-medium",
              active
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                : "text-slate-500 dark:text-slate-400"
            )}
          >
            <Icon size={14} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
