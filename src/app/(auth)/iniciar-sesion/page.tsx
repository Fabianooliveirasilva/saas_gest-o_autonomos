import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/forms/login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/panel");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#00C89633,transparent_30%),radial-gradient(circle_at_bottom_left,#0A254022,transparent_35%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-300/30 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/30">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-600">FacturaFácil</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Bienvenido de nuevo</h1>
        <p className="mt-2 mb-6 text-sm text-slate-500 dark:text-slate-300">Controla facturas, impuestos y gastos desde un único panel.</p>
        <LoginForm />
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-300">
          ¿No tienes cuenta? {" "}
          <Link className="font-semibold text-emerald-600 hover:text-emerald-500" href="/registro">
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  );
}
