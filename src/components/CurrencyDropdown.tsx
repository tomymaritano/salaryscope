// components/CurrencyDropdown.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { currencies } from "@/lib/data/currencies";

export function CurrencyDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[260px] bg-[#18191c]/80 border-1 border-teal-500">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center justify-between w-full
          text-3xl md:text-4xl font-black text-white
          rounded-none
          px-4 py-3
          shadow-none
          transition
          hover:border-teal-400 focus:outline-none
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value}</span>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`
            absolute left-0 w-full mt-1 z-40
          bg-[#18181b] border border-white/10 rounded-none
            shadow-xl
            max-h-70 overflow-auto
            scrollbar-glass
            `}
            tabIndex={-1}
          >
            {currencies.map((c) => (
              <li
                key={c.code}
                className={`
                  px-4 py-3 text-xl font-black cursor-pointer
                  hover:bg-teal-900/40
                  ${value === c.code ? "text-teal-300 bg-teal-900/60" : "text-white"}
                  transition
                `}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                role="option"
                aria-selected={value === c.code}
              >
                {c.code} <span className="ml-2 text-gray-400 font-normal text-sm">{c.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}