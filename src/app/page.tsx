'use client';

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalaryForm from "../components/SalaryForm";
import { SalaryList } from "@/components/SalaryList";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Opcional: cuando el form aparece, scrollea ahí
  const handleShowForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  // Handler para cuando el form se envía o cancela
  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white font-sans antialiased overflow-x-hidden">
      {/* Hero visual */}
      <header className="relative z-10 flex flex-col items-center pt-16 pb-8 px-4">
        {/* Blob animado */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-0 pointer-events-none">
          <svg width="480" height="220" viewBox="0 0 600 400" fill="none">
            <ellipse cx="300" cy="160" rx="240" ry="90" fill="#14b8a6" fillOpacity="0.12"/>
          </svg>
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow bg-gray-900/80 backdrop-blur border border-teal-500 mb-4 relative z-10">
          <svg width={24} height={24} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#14b8a6" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-teal-300 font-bold text-lg tracking-wide">SalaryScope Pro</span>
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight leading-tight z-10 drop-shadow">
          Transparencia salarial IT real &amp; abierta.
        </h1>
        <p className="mt-2 text-base md:text-xl text-gray-200 font-light z-10">
          Descubrí <span className="text-teal-300 font-medium">datos reales</span> de LATAM y Europa, sin cuentas ni emails. 100% anónimo.
        </p>
        {/* Stats+CTA */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 z-10 w-full max-w-2xl">
          <StatCard label="Salarios cargados">424</StatCard>
          <StatCard label="Salario promedio">$2810 USD</StatCard>
          <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
            {!showForm && (
              <button
                className="w-full px-4 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg text-lg transition focus:outline-none"
                onClick={handleShowForm}
              >
                Agregá tu salario
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 bg-gray-900/60 border border-teal-500/20 rounded-2xl px-6 py-4 shadow-lg backdrop-blur z-10 max-w-xl">
          <p className="text-gray-300 text-sm"><b>✔</b> Sin emails ni datos personales. <b>✔</b> Solo se publica lo del formulario. <b>✔</b> Comunidad abierta y verificada.</p>
        </div>
      </header>

      {/* Formulario "reveal" solo si showForm */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            ref={formRef}
            className="max-w-2xl mx-auto mt-2 mb-12 px-4 z-20"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.32 }}
          >
            <div className="bg-white/20 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 relative">
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-teal-500 rounded p-2 transition"
                onClick={handleFormClose}
                aria-label="Cerrar"
              >
                <svg width={22} height={22} fill="none"><path d="M6 6l10 10M6 16L16 6" stroke="currentColor" strokeWidth="2"/></svg>
              </button>
              <h2 className="text-lg font-bold text-teal-300 mb-2">Ingresá tu salario</h2>
              <p className="text-sm text-gray-400 mb-4">
                Sólo se publica lo del formulario. Sin guardar datos privados.
              </p>
              <SalaryForm />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Datos abiertos */}
      <section className="max-w-6xl mx-auto px-4 z-20">
        <h2 className="text-xl font-semibold text-teal-300 mb-2">Datos abiertos</h2>
        <p className="text-sm text-gray-400 mb-6">
          Tendencias, filtros y visualización moderna de salarios en tiempo real.
        </p>
        <div className="rounded-2xl bg-white/10 dark:bg-gray-900/80 shadow-2xl p-6 md:p-8 mb-16 backdrop-blur">
          <SalaryList />
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center bg-white/20 dark:bg-gray-800/40 rounded-xl px-4 py-5 shadow border border-gray-200 dark:border-gray-800 transition hover:scale-[1.03] hover:shadow-lg min-w-[120px]">
      <span className="text-2xl font-bold text-teal-400">{children}</span>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  );
}