import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Topbar({ userName }: { userName?: string | null }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">FacturaFácil</p>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Gestión financiera autónomos</h1>
      </div>
      <div className="flex items-center gap-3">
        <p className="hidden text-sm text-slate-500 dark:text-slate-300 sm:block">Hola, {userName ?? "Autónomo"}</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
