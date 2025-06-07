'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalaryForm from "@/components/SalaryForm";
import { SalaryList } from "@/components/Salary/SalaryList";
import { Modal } from "@/components/Modal";

import Squares from "@/components/Squares/Squares";;
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";



export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
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

        <Hero onAddSalary={() => setShowForm(true)} />


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