// components/Salary/SalariesTable.tsx
import { Salary } from "./types";

interface SalariesTableProps {
  paged: Salary[];
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
  formatCurrency: (amount: number, currency: string) => string;
}

export function SalariesTable({
  paged,
  page,
  pageCount,
  setPage,
  formatCurrency,
}: SalariesTableProps) {
  return (
    <div className="overflow-x-auto border-b border-white/10 rounded-none-2xl">
      <table className="min-w-full text-[15px] text-left font-normal">
        <thead className="bg-transparent text-gray-400 uppercase text-xs border-b border-white/10 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 font-bold">País</th>
            <th className="px-3 py-2 font-bold">Rol</th>
            <th className="px-3 py-2 font-bold hidden md:table-cell">Stack</th>
            <th className="px-3 py-2 font-bold">Contrato</th>
            <th className="px-3 py-2 font-bold">Seniority</th>
            <th className="px-3 py-2 font-bold">Salario</th>
            <th className="px-3 py-2 font-bold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((s, idx) => (
            <tr
              key={s.id}
              className={`transition border-b border-white/5
                ${idx % 2 === 0 ? "bg-[#18181b]" : "bg-[#232326]"}
                hover:bg-[#111214]`}
            >
              <td className="px-3 py-2">{s.country}</td>
              <td className="px-3 py-2">{s.role}</td>
              <td className="px-3 py-2 hidden md:table-cell">
                <span className="inline-block max-w-[160px] truncate text-gray-500">{s.stack.join(", ")}</span>
              </td>
              <td className="px-3 py-2">{s.contract}</td>
              <td className="px-3 py-2">{s.seniority}</td>
              <td className="px-3 py-2 font-semibold text-teal-400">{formatCurrency(s.amount, s.currency)}</td>
              <td className="px-3 py-2 text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString(undefined, { year: "2-digit", month: "short", day: "numeric" })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-2 py-4 bg-transparent">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 rounded-none-lg bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">Anterior</button>
          <span className="text-xs px-2">{page}/{pageCount}</span>
          <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="px-3 py-1 rounded-none-lg bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">Siguiente</button>
        </div>
      )}
    </div>
  );
}