'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalaryForm from "@/components/SalaryForm";
import { SalaryList } from "@/components/Salary/SalaryList";
import { Modal } from "@/components/Modal";
import { StatsRow } from "@/components/StatsRow";        // Modularizado
import { AddSalaryButton } from "@/components/AddSalaryButton"; // Modularizado
import useSalaryStats from "@/hooks/useSalaryStats";
import Squares from "@/components/Squares/Squares";
import BlurText from "@/components/BlurText/BlurText";
import Faq from "@/components/Faq";
import { TypingGradientText } from "@/components/TypingGradient";



export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { stats, loading, error } = useSalaryStats(selectedCurrency);
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  return (
    <main className="min-h-screen text-white font-sans antialiased pb-8">
      <div className="fixed inset-0 w-full min-h-full z-[-1] pointer-events-none">
        <Squares
          speed={0.5}
          squareSize={40}
          direction='right' // up, down, left, right, diagonal
          borderColor='#fff999'
          hoverFillColor='#222'
        />
      </div>
      <header className="w-full max-w-6xl mx-auto pt-10 pb-3 px-4 text-left relative">


        {/* Hero */}
        <motion.h1
          className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-white mt-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,          // Delay de 0.5s (500ms)
            duration: 1.5,
            type: "spring"
          }}
        >
          <BlurText
            text="Transparencia salarial IT sin bullshit"
            animateBy="words"
            direction="top"
            delay={500}

            onAnimationComplete={handleAnimationComplete}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-white mt-12"
          />
        </motion.h1>

        <motion.p
          className="mt-7 mb-10 text-lg md:text-xl text-gray-400 font-normal max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Sin cuentas, sin mails, sin excusas. Datos reales y anónimos de LATAM y Europa.<br />
          <span className="text-teal-300 md:text-md font-semibold tracking-wide"><TypingGradientText /></span>
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
      <section id="opendata" className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-black text-gray-200 mb-3 mt-16 text-left">Datos abiertos</h2>
        <p className="text-base text-gray-500 mb-8 text-left">
          Consultá salarios, filtrá por país, rol o seniority y mirá tendencias reales del mercado.
        </p>
        <div className="border border-white/10 p-6 md:p-10">
          <SalaryList />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4">
        <Faq />
      </section>
    </main>
  );
}