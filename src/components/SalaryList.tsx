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
        const res = await fetch("/api/salaries");
        if (!res.ok) throw new Error("No se pudo obtener los salarios");
        const data = await res.json();
        setSalaries(data);
      } catch {
        setError("Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchSalaries();
  }, []);

  // --- Logic ---
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
    <section className="mt-10 font-sans space-y-10">
      {/* Stats + filtros */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-3 mb-3">
        <div className="flex gap-6 items-end">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-white">{filtered.length}</span>
            <span className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Registros</span>
          </div>
          <div className="flex flex-col ml-8">
            <span className="text-lg font-black text-teal-400">{formatCurrency(avgAmount, topCurrency)}</span>
            <span className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Promedio</span>
          </div>
        </div>
        {/* Filtros modernos minimal */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto mt-4 md:mt-0">
          <select value={country} onChange={e => { setCountry(e.target.value); setPage(1); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
            <option value="">País</option>
            {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={role} onChange={e => { setRole(e.target.value); setPage(1); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
            <option value="">Rol</option>
            {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={seniority} onChange={e => { setSeniority(e.target.value); setPage(1); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
            <option value="">Seniority</option>
            {SENIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={currency} onChange={e => { setCurrency(e.target.value); setPage(1); }} className="min-w-[100px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
            <option value="">Moneda</option>
            {uniqueCurrencies.map(cur => <option key={cur} value={cur}>{cur.toUpperCase()}</option>)}
          </select>
          <button
            onClick={handleResetFilters}
            className="px-3 py-2 text-xs uppercase font-bold bg-transparent border border-white/10 text-gray-400 hover:text-teal-400 hover:border-teal-400 rounded-none-lg transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Tabla salarios */}
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
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-none-lg bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">Anterior</button>
            <span className="text-xs px-2">{page}/{pageCount}</span>
            <button disabled={page === pageCount} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-none-lg bg-[#18181b] text-gray-400 border border-white/10 hover:text-white hover:border-teal-400 disabled:opacity-50 text-xs font-semibold transition">Siguiente</button>
          </div>
        )}
      </div>

      {/* Tabs para los gráficos */}
      <div className="w-full flex flex-col gap-3 mt-8">
        <div className="flex gap-1 border-b border-white/10">
          {chartTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-bold border-b-2
                ${activeTab === tab.key
                  ? "border-teal-400 text-white"
                  : "border-transparent text-gray-500 hover:text-teal-400"}`}
              style={{ fontSize: 15, background: "none" }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-[#18181b] border border-white/10 rounded-none-2xl p-6 min-h-[350px] flex flex-col justify-between">
          {/* SOLO muestra los gráficos de promedio si hay currency */}
          {(activeTab === "role" || activeTab === "country") && !currency && (
            <div className="flex flex-1 items-center justify-center text-center text-gray-500 font-bold text-lg">
              Seleccioná una moneda para ver los promedios salariales.
            </div>
          )}
          {activeTab === "role" && currency && (
            <>
              <h3 className="font-bold mb-2 text-gray-200 text-center uppercase text-sm tracking-widest">Promedio salarial por Rol</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={avgPerRole} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#232326" />
                  <XAxis dataKey="role" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    wrapperClassName="!rounded-none !shadow-none"
                    contentStyle={{ borderRadius: 0, fontSize: 13, background: "#232326", color: "#fff", border: "none" }}
                    formatter={(
                      value: string | number,
                      _name: string,
                      item: { payload?: { currency: string } }
                    ) => formatCurrency(Number(value), item?.payload?.currency ?? 'USD')}
                  />
                  <Bar dataKey="avg" fill="#14b8a6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          {activeTab === "country" && currency && (
            <>
              <h3 className="font-bold mb-2 text-gray-200 text-center uppercase text-sm tracking-widest">Promedio salarial por País</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={avgPerCountry} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#232326" />
                  <XAxis dataKey="country" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    wrapperClassName="!rounded-none !shadow-none"
                    contentStyle={{ borderRadius: 0, fontSize: 13, background: "#232326", color: "#fff", border: "none" }}
                    formatter={(
                      value: string | number,
                      _name: string,
                      item: { payload?: { currency: string } }
                    ) => formatCurrency(Number(value), item?.payload?.currency ?? 'USD')}
                  />
                  <Bar dataKey="avg" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          {/* El gráfico de seniorities se muestra SIEMPRE */}
          {activeTab === "seniority" && (
            <>
              <h3 className="font-bold mb-2 text-gray-200 text-center uppercase text-sm tracking-widest">Distribución de seniorities</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={seniorityDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {seniorityDist.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "#fff" }} />
                  <Tooltip
                    wrapperClassName="!rounded-none !shadow-none"
                    contentStyle={{ borderRadius: 0, fontSize: 13, background: "#232326", color: "#fff", border: "none" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </section>
  );
} 