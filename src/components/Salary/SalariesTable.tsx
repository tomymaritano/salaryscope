// components/Salary/SalariesTable.tsx
import { Salary } from "./types";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  return (
    <div className="w-full">

      {/* Mobile: Cards */}
      <div className="md:hidden flex flex-col gap-3 mt-2">
        {paged.length === 0 && (
          <div className="text-center text-gray-400 text-base py-6">{t('messages.noData')}</div>
        )}
        {paged.map((s) => (
          <div
            key={s.id}
            className="bg-black/90 border border-white/10 shadow-md rounded-none p-4 transition-all
                      flex flex-col gap-2 glass-card"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-teal-300 text-base">{s.country}</span>
              <span className="font-black text-lg text-teal-400">{formatCurrency(s.amount, s.currency)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-white">{s.role}</span>
              <span className="text-xs text-gray-400 bg-white/5 rounded px-2 py-0.5 ml-2">{s.seniority}</span>
            </div>
            <div className="text-xs text-gray-400 flex gap-4 mt-1">
              <span>{s.contract}</span>
              <span>{s.stack.slice(0, 2).join(", ")}</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-2">{new Date(s.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      {/* Desktop: Tabla */}
      <div className="hidden md:block relative mt-3">
        <div className="overflow-x-auto rounded-2xl shadow-lg glass-card">
          <table className="min-w-full text-sm font-normal backdrop-blur-2xl bg-black/80 border-separate border-spacing-0">
            <thead>
              <tr className="sticky items-start top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.country')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.role')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.stack')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.contract')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.seniority')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.salary')}</th>
                <th className="px-auto text-start py-3 text-xs text-gray-300 font-bold">{t('table.date')}</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`
                    border-b border-white/5
                    transition-all duration-150
                    ${idx % 2 === 0 ? "bg-black/90" : "bg-teal-950/30"}
                    hover:bg-teal-800/20 hover:scale-[1.01]
                  `}
                >
                  <td className="pr-4 py-3 text-start">{s.country}</td>
                  <td className="pr-0 py-3 text-start">{s.role}</td>
                  <td className="pr-6 py-3 text-start max-w-[180px] truncate text-gray-400">{s.stack.join(", ")}</td>
                  <td className="pr-1 py-3 text-start">{s.contract}</td>
                  <td className="pr-2 py-3 text-start">{s.seniority}</td>
                  <td className="pr-2 py-3 text-start font-bold text-teal-400">{formatCurrency(s.amount, s.currency)}</td>
                  <td className="pr-2 py-3 text-start text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString(undefined, { year: "2-digit", month: "short", day: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (compartida) */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-2 py-5">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 rounded-none bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">{t('table.prev')}</button>
          <span className="text-xs px-2">{page}/{pageCount}</span>
          <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="px-3 py-1 rounded-none bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">{t('table.next')}</button>
        </div>
      )}
    </div>
  );
}

// Agregá este css en tu global.css o tailwind.config para glass-card:
/*
.glass-card {
 @apply backdrop-blur-lg bg-white/5 border border-white/10 shadow-[0_2px_24px_0_rgba(20,184,166,0.09)];
}
*/