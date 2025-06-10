'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalaryForm from "@/components/SalaryForm";
import { SalaryList } from "@/components/Salary/SalaryList";
import { Modal } from "@/components/Modal";
import Squares from "@/components/Squares/Squares";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

// Easter egg para consola dev
if (typeof window !== "undefined") {

  console.info(
    "%c👾 HackLab SalaryBoard\n%cContribuí anónimamente y ayudá a la comunidad dev.",
    "color:#0ff;font-weight:bold;font-size:14px;",
    "color:#888;"
  );
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const t = useTranslations();

  return (
    <main className="min-h-screen text-white font-sans antialiased pb-8">
      {/* BG animated squares */}
      <div className="fixed inset-0 w-full min-h-full z-[-1] pointer-events-none">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="right"
          borderColor="#fff999"
          hoverFillColor="#222"
        />
      </div>

      {/* HERO */}
      <header className="w-full max-w-6xl mx-auto pt-10 pb-3 px-4 text-left relative">
        <Hero onAddSalary={() => setShowForm(true)} />
      </header>


      {/* MODAL FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.21 }}
          >
            <Modal open={showForm} onClose={() => setShowForm(false)}>
              <h2 className="text-xl font-black text-gray-100 mb-2 text-left">{t('modal.title')}</h2>
              <p className="text-sm text-gray-500 mb-4 font-mono">
                <span className="text-teal-300">No logs, no tracking.</span>
              </p>
              <SalaryForm />
              <p className="text-xs mt-4 text-gray-700 font-mono">
                {/* hint de geek UX */}
                {/* tip: Proba <kbd>Ctrl+K</kbd> o <kbd>⌘+K</kbd> para buscar roles más rápido */}
                {t.raw('modal.tip')}
              </p>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DATA */}
      <section id="opendata" className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-black text-gray-200 mb-3 mt-16 text-left font-mono">{t('openData.heading')}</h2>
        <p className="text-base text-gray-500 mb-8 text-left font-mono">
          {t('openData.description')}
        </p>
        <div className="border border-white/10 p-6 md:p-10 rounded-none bg-[#0e0e11]/70 backdrop-blur-md shadow-lg">
          <SalaryList />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <Faq />
      </section>
    </main>
  );
}