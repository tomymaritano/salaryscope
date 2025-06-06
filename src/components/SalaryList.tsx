// components/SalaryList.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

interface Salary {
  id: string;
  country: string;
  role: string;
  stack: string[];
  contract: string;
  seniority: string;
  amount: number;
  currency: string;
  createdAt: string;
}

const SENIORITIES = ["Junior", "Mid", "Senior", "Lead"];
const COLORS = ["#14b8a6", "#60a5fa", "#eab308", "#f472b6", "#f87171", "#4ade80", "#a78bfa", "#facc15"];

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

const chartTabs = [
  { key: "role", label: "Promedio por Rol" },
  { key: "country", label: "Promedio por País" },
  { key: "seniority", label: "Distribución Seniority" },
];

export function SalaryList() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const [currency, setCurrency] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("role");
  const pageSize = 10;

  useEffect(() => {
    async function fetchSalaries() {
      try {
        const res = await fetch("/api/salaries");
        if (!res.ok) throw new Error("No se pudo obtener los salarios");
        const data = await res.json();
        setSalaries(data);
      } catch (err: unknown) {
        if (typeof err === "object" && err && "message" in err) {
          setError((err as { message?: string }).message ?? "Error desconocido");
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSalaries();
  }, []);

  // --- LOGIC IGUAL ---
  const filtered = useMemo(() => {
    return salaries.filter((s) =>
      (!country || s.country.toLowerCase().includes(country.toLowerCase())) &&
      (!role || s.role.toLowerCase().includes(role.toLowerCase())) &&
      (!seniority || s.seniority === seniority) &&
      (!currency || s.currency.toUpperCase() === currency.toUpperCase())
    );
  }, [salaries, country, role, seniority, currency]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const uniqueCountries = useMemo(() => Array.from(new Set(salaries.map(s => s.country))).sort(), [salaries]);
  const uniqueRoles = useMemo(() => Array.from(new Set(salaries.map(s => s.role))).sort(), [salaries]);
  const uniqueCurrencies = useMemo(() => Array.from(new Set(salaries.map(s => s.currency))).sort(), [salaries]);

  // Stats
  const totalAmount = filtered.reduce((acc, s) => acc + s.amount, 0);
  const avgAmount = filtered.length > 0 ? totalAmount / filtered.length : 0;
  const topCurrency = filtered.length > 0 ? filtered[0].currency : "USD";

  // Gráficos
  const avgPerRole = useMemo(() => {
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
  }, [filtered]);
  const avgPerCountry = useMemo(() => {
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
  }, [filtered]);
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
    <section className="mt-10 space-y-10 font-sans">
      {/* Stats & Filtros */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-xl bg-teal-50 text-teal-800 font-bold text-sm">{filtered.length}</span>
            <span className="text-sm text-gray-500">Salarios reportados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Promedio:</span>
            <span className="text-base font-bold text-teal-600">{formatCurrency(avgAmount, topCurrency)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto bg-white/80 dark:bg-gray-900/80 p-2 rounded-xl  border border-gray-100 dark:border-gray-800">
          <select value={country} onChange={e => { setCountry(e.target.value); setPage(1); }} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-700 focus:outline-teal-400">
            <option value="">País</option>
            {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={role} onChange={e => { setRole(e.target.value); setPage(1); }} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-700 focus:outline-teal-400">
            <option value="">Rol</option>
            {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={seniority} onChange={e => { setSeniority(e.target.value); setPage(1); }} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-700 focus:outline-teal-400">
            <option value="">Seniority</option>
            {SENIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={currency} onChange={e => { setCurrency(e.target.value); setPage(1); }} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-700 focus:outline-teal-400">
            <option value="">Moneda</option>
            {uniqueCurrencies.map(cur => <option key={cur} value={cur}>{cur.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 -lg transition">
        <table className="min-w-full text-[15px] text-left font-normal">
          <thead className="bg-gray-50 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 uppercase text-xs sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-bold">País</th>
              <th className="px-4 py-3 font-bold">Rol</th>
              <th className="px-4 py-3 font-bold hidden md:table-cell">Stack</th>
              <th className="px-4 py-3 font-bold">Contrato</th>
              <th className="px-4 py-3 font-bold">Seniority</th>
              <th className="px-4 py-3 font-bold">Salario</th>
              <th className="px-4 py-3 font-bold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((s, idx) => (
              <tr
                key={s.id}
                className={`transition ${idx % 2 === 0 ? "bg-white dark:bg-gray-900/70" : "bg-gray-50 dark:bg-gray-800/60"} hover:bg-teal-50 dark:hover:bg-teal-900/40`}
              >
                <td className="px-4 py-3">{s.country}</td>
                <td className="px-4 py-3">{s.role}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-block max-w-[160px] truncate text-gray-400">{s.stack.join(", ")}</span>
                </td>
                <td className="px-4 py-3">{s.contract}</td>
                <td className="px-4 py-3">{s.seniority}</td>
                <td className="px-4 py-3 font-semibold text-teal-600">{formatCurrency(s.amount, s.currency)}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString(undefined, { year: "2-digit", month: "short", day: "numeric" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        {pageCount > 1 && (
          <div className="flex justify-center items-center gap-2 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900 disabled:opacity-50 text-xs font-semibold">Anterior</button>
            <span className="text-xs px-2">{page}/{pageCount}</span>
            <button disabled={page === pageCount} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900 disabled:opacity-50 text-xs font-semibold">Siguiente</button>
          </div>
        )}
      </div>

      {/* Tabs para gráficos */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-1 mb-2 border-b border-gray-100 dark:border-gray-700">
          {chartTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all
                ${activeTab === tab.key
                  ? "bg-white dark:bg-gray-900 border-x border-t border-gray-100 dark:border-gray-700 -mb-px text-teal-700 dark:text-teal-400 "
                  : "bg-transparent text-gray-500 hover:text-teal-600"}`}
              style={{ fontSize: 15 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl border border-gray-100 dark:border-gray-800  p-4 min-h-[350px] flex flex-col justify-between">
          {activeTab === "role" && (
            <>
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-center">Promedio salarial por Rol</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={avgPerRole} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 4" />
                  <XAxis dataKey="role" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    wrapperClassName="!rounded-xl !"
                    contentStyle={{ borderRadius: 12, fontSize: 13 }}
                    formatter={(
                      value: string | number,
                      _name: string,
                      item: { payload?: { currency: string } }
                    ) => formatCurrency(Number(value), item?.payload?.currency ?? 'USD')}
                  />
                  <Bar dataKey="avg" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          {activeTab === "country" && (
            <>
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-center">Promedio salarial por País</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={avgPerCountry} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 4" />
                  <XAxis dataKey="country" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    wrapperClassName="!rounded-xl !"
                    contentStyle={{ borderRadius: 12, fontSize: 13 }}
                    formatter={(
                      value: string | number,
                      _name: string,
                      item: { payload?: { currency: string } }
                    ) => formatCurrency(Number(value), item?.payload?.currency ?? 'USD')}
                  />
                  <Bar dataKey="avg" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          {activeTab === "seniority" && (
            <>
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-center">Distribución de seniorities</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={seniorityDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {seniorityDist.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </section>
  );
}