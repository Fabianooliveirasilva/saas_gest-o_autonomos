import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/forms/register-form";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/panel");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0A25402b,transparent_35%),radial-gradient(circle_at_bottom_right,#00C89633,transparent_30%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-300/30 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/30">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-600">FacturaFácil</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Crea tu cuenta</h1>
        <p className="mt-2 mb-6 text-sm text-slate-500 dark:text-slate-300">Lanza tu control financiero en menos de 2 minutos.</p>
        <RegisterForm />
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-300">
          ¿Ya tienes cuenta? {" "}
          <Link className="font-semibold text-emerald-600 hover:text-emerald-500" href="/iniciar-sesion">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
