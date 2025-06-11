import React from "react";
import { Eraser } from "lucide-react";

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
    <div
      className="
        w-full flex flex-col gap-3
        sm:flex-row sm:flex-wrap sm:gap-3 sm:items-center
        md:justify-end
      "
    >
      {[
        {
          value: country, set: setCountry, options: uniqueCountries, placeholder: "País",
        },
        {
          value: role, set: setRole, options: uniqueRoles, placeholder: "Rol",
        },
        {
          value: seniority, set: setSeniority, options: SENIORITIES, placeholder: "Seniority",
        },
        {
          value: currency, set: setCurrency, options: uniqueCurrencies, placeholder: "Moneda",
          format: (x: string) => x.toUpperCase(),
        },
      ].map((s) => (
        <select
          key={s.placeholder}
          value={s.value}
          onChange={e => s.set(e.target.value)}
          className="
            w-full sm:w-auto
            text-sm sm:text-xs font-semibold uppercase
            px-4 py-4 sm:px-3 sm:py-2
            rounded-none
            bg-black/20 bg-clip-padding
            border border-teal-400/30
            text-gray-200 shadow-sm
            outline-none transition
            focus:border-teal-400 focus:ring-2 focus:ring-teal-600/30
            hover:bg-teal-400/15 hover:border-teal-400/70
            duration-150
          "
        >
          <option value="">{s.placeholder}</option>
          {s.options.map((opt) => (
            <option key={opt} value={opt}>
              {s.format ? s.format(opt) : opt}
            </option>
          ))}
        </select>
      ))}
      <button
        onClick={handleResetFilters}
        className="
          w-full sm:w-auto
          flex items-center justify-center gap-1
          px-4 py-4 sm:px-3 sm:py-2
          text-sm sm:text-xs font-bold uppercase
          rounded-none
          bg-gradient-to-r from-black/80 to-teal-900/20
          border border-teal-400/20
          text-teal-300
          hover:bg-teal-700/20 hover:text-white hover:border-teal-400
          focus:ring-2 focus:ring-teal-400
          transition-all duration-150
          shadow-sm
        "
      >
        <Eraser size={18} className="text-teal-400" />
        Limpiar
      </button>
    </div>
  );
}