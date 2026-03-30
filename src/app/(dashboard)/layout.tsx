import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/iniciar-sesion");
  }

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,#e9fbf5_0%,transparent_30%),radial-gradient(circle_at_bottom_right,#d8e6f729,transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,#08203a33_0%,transparent_30%),radial-gradient(circle_at_bottom_right,#0527172e,transparent_35%)]">
      <div className="hidden w-72 shrink-0 lg:block">
        <Sidebar />
      </div>
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar userName={session.user.name} />
        <MobileNav />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
