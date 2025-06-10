"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiltersBar } from "./FiltersBar";
import { SalariesTable } from "./SalariesTable";
import { ChartTabs } from "./ChartTabs";
import { Salary } from "./types";

const SENIORITIES = ["Junior", "Mid", "Senior", "Lead"];

function formatCurrency(amount: number, currency: string) {
  try {
    return amount.toLocaleString(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  } catch {
    return `${amount} ${currency.toUpperCase()}`;
  }
}

export function SalaryList() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const [currency, setCurrency] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"role" | "country" | "seniority">("role")
  const pageSize = 10;

  const handleResetFilters = () => {
    setCountry("");
    setRole("");
    setSeniority("");
    setCurrency("");
    setPage(1);
  };

  useEffect(() => {
    async function fetchSalaries() {
      try {
        setLoading(true);
        const res = await fetch(`/api/salaries?page=${page}&pageSize=${pageSize}`);
        if (!res.ok) throw new Error("No se pudo obtener los salarios");
        const data = await res.json();
        setSalaries(data.salaries);
        setTotal(data.total);
      } catch {
        setError("Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchSalaries();
  }, [page]);

  // --- Logic ---
  const filtered = useMemo(() => {
    return salaries.filter((s) =>
      (!country || s.country.toLowerCase().includes(country.toLowerCase())) &&
      (!role || s.role.toLowerCase().includes(role.toLowerCase())) &&
      (!seniority || s.seniority === seniority) &&
      (!currency || s.currency.toUpperCase() === currency.toUpperCase())
    );
  }, [salaries, country, role, seniority, currency]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const paged = filtered;
  const uniqueCountries = useMemo(() => Array.from(new Set(salaries.map(s => s.country))).sort(), [salaries]);
  const uniqueRoles = useMemo(() => Array.from(new Set(salaries.map(s => s.role))).sort(), [salaries]);
  const uniqueCurrencies = useMemo(() => Array.from(new Set(salaries.map(s => s.currency))).sort(), [salaries]);

  // Stats
  const totalAmount = filtered.reduce((acc, s) => acc + s.amount, 0);
  const avgAmount = filtered.length > 0 ? totalAmount / filtered.length : 0;
  const topCurrency = filtered.length > 0 ? filtered[0].currency : "USD";

  // Charts
  // Promedios: SOLO si hay currency seleccionada
  const avgPerRole = useMemo(() => {
    if (!currency) return [];
    const grouped: { [role: string]: { total: number; count: number; currency: string } } = {};
    filtered.forEach((s) => {
      if (!grouped[s.role]) grouped[s.role] = { total: 0, count: 0, currency: s.currency };
      grouped[s.role].total += s.amount;
      grouped[s.role].count += 1;
      grouped[s.role].currency = s.currency;
    });
    return Object.entries(grouped).map(([role, stats]) => ({
      role,
      avg: Math.round(stats.total / stats.count),
      currency: stats.currency,
    }));
  }, [filtered, currency]);

  const avgPerCountry = useMemo(() => {
    if (!currency) return [];
    const grouped: { [country: string]: { total: number; count: number; currency: string } } = {};
    filtered.forEach((s) => {
      if (!grouped[s.country]) grouped[s.country] = { total: 0, count: 0, currency: s.currency };
      grouped[s.country].total += s.amount;
      grouped[s.country].count += 1;
      grouped[s.country].currency = s.currency;
    });
    return Object.entries(grouped).map(([country, stats]) => ({
      country,
      avg: Math.round(stats.total / stats.count),
      currency: stats.currency,
    }));
  }, [filtered, currency]);

  // Distribución: SIEMPRE se muestra
  const seniorityDist = useMemo(() => {
    const grouped: { [sen: string]: number } = {};
    SENIORITIES.forEach(s => grouped[s] = 0);
    filtered.forEach((s) => {
      grouped[s.seniority] = (grouped[s.seniority] || 0) + 1;
    });
    return SENIORITIES.map(sen => ({
      name: sen,
      value: grouped[sen] || 0
    }));
  }, [filtered]);

  // --- UI ---
  if (loading) return <p className="text-center text-gray-400">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (salaries.length === 0) return <p className="text-center text-gray-400">No hay salarios aún.</p>;

  return (
    <section className="font-sans space-y-10 px-2 sm:px-4 md:px-0">
      {/* Stats + filtros */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-y-6 gap-x-4 border-b border-white/10 pb-3 mb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-6 gap-x-4 border-b border-white/10 pb-3 mb-3">
          <div className="flex w-full justify-between gap-4 items-end">
            {/* Registros */}
            <div className="flex flex-col w-1/2 items-start">
              <motion.span
                key={filtered.length}
                className="text-3xl md:text-3xl font-extrabold text-white leading-tight"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {filtered.length}
              </motion.span>
              <span className="text-[13px] md:text-sm uppercase text-gray-500 font-semibold tracking-wide mt-1">
                Registros
              </span>
            </div>
            {/* Promedio */}
            <div className="flex flex-col w-1/2 items-end md:items-start md:ml-8">
              <motion.span
                key={avgAmount + topCurrency}
                className="text-xl md:text-3xl font-black text-white leading-tight"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {formatCurrency(avgAmount, topCurrency)}
              </motion.span>
              <span className="text-xl md:text-sm uppercase text-gray-500 font-semibold tracking-wide mt-1">
                Promedio
              </span>
            </div>
          </div>
        </div>
        {/* Los filtros ya deberían ser responsivos, pero revisá FiltersBar */}
        <FiltersBar
          country={country}
          setCountry={setCountry}
          role={role}
          setRole={setRole}
          seniority={seniority}
          setSeniority={setSeniority}
          currency={currency}
          setCurrency={setCurrency}
          handleResetFilters={handleResetFilters}
          uniqueCountries={uniqueCountries}
          uniqueRoles={uniqueRoles}
          uniqueCurrencies={uniqueCurrencies}
        />
      </div>
      <SalariesTable
        paged={paged}
        page={page}
        pageCount={pageCount}
        setPage={setPage}
        formatCurrency={formatCurrency}
      />
      <ChartTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        avgPerRole={avgPerRole}
        avgPerCountry={avgPerCountry}
        seniorityDist={seniorityDist}
        currency={currency}
      />
    </section>
  );
}