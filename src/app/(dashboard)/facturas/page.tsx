import { Download } from "lucide-react";
import { auth } from "@/auth";
import { InvoiceForm } from "@/components/forms/invoice-form";
import { toNumber } from "@/lib/number";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function FacturasPage() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Facturas</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Gestión de facturación</h2>
      </div>

      <InvoiceForm />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">N. factura</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">CIF/NIF</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">PDF</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{invoice.invoiceNumber}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{invoice.clientName}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{invoice.cifNif}</td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(toNumber(invoice.total))}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{invoice.createdAt.toLocaleDateString("es-ES")}</td>
                <td className="px-4 py-3">
                  <a
                    href={`/api/invoices/${invoice.id}/pdf`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200"
                  >
                    <Download size={14} />
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                  Aún no has creado facturas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
