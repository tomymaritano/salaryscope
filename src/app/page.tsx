'use client';

import {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalaryForm from "@/components/SalaryForm";
import { SalaryList } from "@/components/SalaryList";
import { Modal } from "@/components/Modal";
import { StatsRow } from "@/components/StatsRow";        // Modularizado
import { AddSalaryButton } from "@/components/AddSalaryButton"; // Modularizado
import useSalaryStats from "@/hooks/useSalaryStats";



export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { stats, loading, error } = useSalaryStats(selectedCurrency);

  return (
    <main className="min-h-screen bg-[#111214] text-white font-sans antialiased">
      <header className="w-full max-w-6xl mx-auto pt-40 pb-14 px-4 text-left relative">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full px-0 flex justify-between items-center h-14 border-b border-white/5 backdrop-blur-sm z-30">
          <span className="font-black text-lg tracking-tight text-white pl-2">SalaryScope Pro</span>
          <a href="#opendata" className="text-sm text-gray-400 hover:text-white transition-all font-medium px-4">Ver datos</a>
        </nav>

        {/* Hero */}
        <motion.h1
          className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-white mt-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          Transparencia salarial<br /><span className="text-[#D1D5DB]">IT sin bullshit</span>
        </motion.h1>
        <motion.p
          className="mt-7 mb-10 text-lg md:text-2xl text-gray-400 font-normal max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Sin cuentas, sin mails, sin excusas. Datos reales y anónimos de LATAM y Europa.<br />
          <span className="text-gray-300 font-semibold tracking-wide">Nunca pedimos tu info personal.</span>
        </motion.p>

        {/* StatsBar (Stats + CurrencyDropdown) */}
        <StatsRow
          stats={stats}
          loading={loading}
          error={error}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />

        {/* Línea divisoria */}
        <div className="border-t border-white/10 mt-8 pt-6" />

        {/* Botón brutalista alineado a la izquierda */}
        <div className="w-full flex justify-start">
          <AddSalaryButton onClick={() => setShowForm(true)} />
        </div>
      </header>

      {/* MODAL SalaryForm */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.21 }}
          >
            <Modal open={showForm} onClose={() => setShowForm(false)}>
              <h2 className="text-xl font-black text-gray-100 mb-2 text-left">Ingresá tu salario</h2>
              <p className="text-sm text-gray-500 mb-4">
                Solo publicamos lo del formulario. Sin guardar datos privados.
              </p>
              <SalaryForm />
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DATA */}
      <section id="opendata" className="max-w-6xl mx-auto px-4 z-20">
        <h2 className="text-2xl font-black text-gray-200 mb-3 mt-16 text-left">Datos abiertos</h2>
        <p className="text-base text-gray-500 mb-8 text-left">
          Consultá salarios, filtrá por país, rol o seniority y mirá tendencias reales del mercado.
        </p>
        <div className="border border-white/10 p-6 md:p-10 mb-20">
          <SalaryList />
        </div>
      </section>
    </main>
  );
}