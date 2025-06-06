import { motion } from "framer-motion";

export function Hero({ onAddClick }: { onAddClick: () => void }) {
  return (
    <header className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4 min-h-[75vh] text-center bg-gradient-to-br from-[#0f172a] via-[#132537] to-[#23293e] overflow-hidden select-none">
      {/* BG Blob animado */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 z-0"
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <svg width="1100" height="440" viewBox="0 0 1100 440" fill="none">
          <ellipse cx="550" cy="220" rx="500" ry="160" fill="#14b8a6" fillOpacity="0.13" />
        </svg>
      </motion.div>

      {/* Ilustración tech */}
      <motion.img
        src="/hero-analytics.svg" // Cambia por tu SVG, PNG o hasta video loop
        alt="Dashboard Salary"
        className="w-56 h-56 mx-auto mb-5 drop-shadow-xl rounded-2xl border-4 border-teal-500/70 bg-white/30"
        initial={{ opacity: 0, scale: 0.98, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, type: "spring" }}
      />

      {/* Logo / Brand badge */}
      <motion.div
        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gray-900/80 border border-teal-400 shadow-lg mb-3 z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <svg width={28} height={28} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#14b8a6" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="text-teal-300 font-bold text-xl tracking-wide drop-shadow">SalaryScope Pro</span>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="mt-2 text-5xl md:text-7xl font-black tracking-tight leading-tight text-white drop-shadow-2xl bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22 }}
      >
        Transparencia salarial IT<br className="hidden md:block" />
        <span className="text-teal-400/90 drop-shadow-xl">real, abierta y anónima</span>
      </motion.h1>

      {/* Subheadline con efecto glass y animación */}
      <motion.div
        className="mt-5 mb-7 px-6 py-3 rounded-xl bg-white/15 dark:bg-gray-900/80 backdrop-blur border border-teal-400/20 shadow-md text-lg md:text-2xl font-light text-gray-200 max-w-2xl mx-auto z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        Conocé <span className="font-semibold text-teal-300">datos reales de LATAM y Europa</span>.<br />
        Sin cuentas, sin emails, solo comunidad.
      </motion.div>

      {/* Stats con efecto glass y iconos minimalistas */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center mb-9 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
      >
        <StatHero icon="📊" label="Salarios cargados" value="+420" />
        <StatHero icon="💸" label="Promedio" value="$2.800 USD" />
        <StatHero icon="🕒" label="Actualizado" value="Hoy" />
      </motion.div>

      {/* CTA Principal con microinteracción */}
      <motion.button
        className="mt-1 px-10 py-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-2xl text-gray-950 text-2xl font-black transition hover:scale-105 hover:from-teal-500 hover:to-cyan-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-200"
        whileTap={{ scale: 0.96 }}
        onClick={onAddClick}
      >
        + Agregá tu salario
      </motion.button>

      {/* Barra confianza tipo pill */}
      <motion.div
        className="mt-9 flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900/70 border border-teal-400/15 shadow-lg backdrop-blur max-w-lg mx-auto text-gray-200 text-base z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <span className="inline-flex items-center gap-1">
          <svg width={19} height={19} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="#14b8a6" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-semibold text-teal-400">Sin emails</span>
        </span>
        <span className="mx-2 text-gray-500 font-bold text-lg">·</span>
        <span className="font-semibold text-teal-400">Datos públicos</span>
        <span className="mx-2 text-gray-500 font-bold text-lg">·</span>
        <span className="font-semibold text-teal-400">Comunidad abierta</span>
      </motion.div>
    </header>
  );
}

// Stats block - glassmorphism
function StatHero({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-white/25 dark:bg-gray-800/50 rounded-xl px-7 py-6 shadow border border-teal-300/10 dark:border-teal-800/15 transition min-w-[130px]">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-3xl font-black text-teal-400">{value}</span>
      <span className="text-xs text-gray-400 mt-1 font-semibold">{label}</span>
    </div>
  );
}
