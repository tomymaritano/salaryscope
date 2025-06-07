// components/Salary/FiltersBar.tsx
import React from "react";

interface FiltersBarProps {
  country: string;
  setCountry: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  seniority: string;
  setSeniority: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
  handleResetFilters: () => void;
  uniqueCountries: string[];
  uniqueRoles: string[];
  uniqueCurrencies: string[];
}

const SENIORITIES = ["Junior", "Mid", "Senior", "Lead"];

export function FiltersBar({
  country,
  setCountry,
  role,
  setRole,
  seniority,
  setSeniority,
  currency,
  setCurrency,
  handleResetFilters,
  uniqueCountries,
  uniqueRoles,
  uniqueCurrencies,
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap gap-2 w-full md:w-auto mt-4 md:mt-0">
      <select value={country} onChange={e => { setCountry(e.target.value); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
        <option value="">País</option>
        {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={role} onChange={e => { setRole(e.target.value); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
        <option value="">Rol</option>
        {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={seniority} onChange={e => { setSeniority(e.target.value); }} className="min-w-[120px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
        <option value="">Seniority</option>
        {SENIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={currency} onChange={e => { setCurrency(e.target.value); }} className="min-w-[100px] text-xs px-3 py-2 bg-[#18181b] border border-white/10 text-gray-200 focus:outline-none focus:border-teal-500 uppercase font-semibold rounded-none-lg">
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
  );
}