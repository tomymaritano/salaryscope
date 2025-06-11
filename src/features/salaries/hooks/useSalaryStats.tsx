import { useEffect, useState } from "react";

// HOOK MODULARIZADO (si preferís, ponelo en /hooks/useSalaryStats.ts y exportalo)
export default function useSalaryStats(currency: string) {
  const [stats, setStats] = useState<{ total: number; avg: number; currency: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mejor con useEffect sólo si cambia la currency
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/salaries/stats?currency=${currency}`);
        const data = await res.json();
        if (data.error) {
          setStats(null);
          setError(data.error);
        } else {
          setStats(data);
          setError(null);
        }
      } catch {
        setStats(null);
        setError("Error cargando estadísticas");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [currency]);

  return { stats, loading, error };
}