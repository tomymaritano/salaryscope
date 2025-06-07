// components/StatsRow.tsx
import { CurrencyDropdown } from "./CurrencyDropdown";
import { Stat } from "./Stat";

interface StatsRowProps {
  stats: { total: number; avg: number; currency: string } | null;
  loading: boolean;
  error: string | null;
  selectedCurrency: string;
  setSelectedCurrency: (val: string) => void;
}

export function StatsRow({
  stats,
  loading,
  error,
  selectedCurrency,
  setSelectedCurrency,
}: StatsRowProps) {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row-reverse md:items-start md:justify-between gap-6 md:gap-0">
      <div className="flex items-center gap-2">
        <CurrencyDropdown value={selectedCurrency} onChange={setSelectedCurrency} />
      </div>
      <div className="flex gap-8 mt-2 md:mt-0">
        {loading ? (
          <>
            <div className="min-w-[130px] animate-pulse h-12 bg-white/5 rounded-none" />
            <div className="min-w-[130px] animate-pulse h-12 bg-white/5 rounded-none" />
          </>
        ) : error ? (
          <span className="text-red-400 text-sm">{error}</span>
        ) : stats ? (
          <>
            <Stat label="Salarios cargados" value={stats.total.toLocaleString()} />
            <Stat label="Salario promedio" value={`${stats.avg.toLocaleString()} ${stats.currency}`} />
          </>
        ) : (
          <span className="text-red-400 text-sm">No hay stats</span>
        )}
      </div>
    </div>
  );
}