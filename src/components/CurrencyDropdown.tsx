import { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown si clickeás fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      className="relative w-full min-w-[220px] md:min-w-[320px] max-w-full"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full flex items-center justify-between gap-2
          text-base sm:text-lg md:text-2xl font-black text-white
          px-4 py-4 sm:py-3
          rounded-none
          bg-black/15 backdrop-blur-[3px]
          border-b-2 border-b-teal-400/20
          shadow-sm
          transition-all duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60
          hover:bg-teal-400/10 hover:border-teal-400/50
          active:scale-[0.99]
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{value || "Seleccioná moneda"}</span>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} />
        </svg>
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
              bg-[#111214]/90 border border-teal-400/20 rounded-none
              shadow-2xl
              max-h-56 overflow-y-auto scrollbar-glass
              backdrop-blur-xl
            `}
            tabIndex={-1}
          >
            {currencies.map((c) => (
              <li
                key={c.code}
                className={`
                  px-4 py-4 sm:py-3 text-base md:text-lg font-semibold uppercase
                  cursor-pointer select-none
                  hover:bg-teal-800/40 hover:text-teal-200
                  ${value === c.code ? "text-teal-300 bg-teal-900/70" : "text-white"}
                  transition-all duration-100
                  active:bg-teal-900/90
                  rounded-none
                `}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                role="option"
                aria-selected={value === c.code}
              >
                {c.code}
                <span className="ml-2 text-gray-400 font-normal text-xs md:text-sm">
                  {c.name}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}