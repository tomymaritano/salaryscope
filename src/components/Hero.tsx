"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/BlurText/BlurText";
import { TypingGradientText } from "@/components/TypingGradient";
import { AddSalaryButton } from "@/components/AddSalaryButton";
import { StatsRow } from "./StatsRow";
import useSalaryStats from "@/hooks/useSalaryStats";
import { ViewDataButton } from "./ViewDataButton";

export default function Hero({ onAddSalary }: { onAddSalary: () => void }) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { stats, loading, error } = useSalaryStats(selectedCurrency);

  // Scroll smooth a la sección de datos
  const handleScrollToData = () => {
    const el = document.getElementById("opendata");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="
        min-h-[85vh] flex flex-col justify-center
        max-w-6xl mx-auto pt-8 sm:pt-10 pb-10
      "
    >
      {/* Título grande */}
      <motion.h1
        className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] text-white mb-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 1.2,
          type: "spring"
        }}
      >
        <BlurText
          text="Transparencia salarial IT sin bullshit"
          animateBy="words"
          direction="top"
          delay={500}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] text-white"
        />
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="mt-6 mb-10 text-lg md:text-2xl text-gray-400 font-normal max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        Sin cuentas, sin mails, sin excusas. Datos reales y anónimos de LATAM y Europa.<br />
        <span className="text-teal-300 md:text-md font-semibold tracking-wide">
          <TypingGradientText />
        </span>
      </motion.p>

      {/* Stats + Dropdown */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <StatsRow
          stats={stats}
          loading={loading}
          error={error}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>

      {/* Botones */}
      <div className="w-full flex flex-col sm:flex-row gap-3 justify-start mt-4">
        <AddSalaryButton onClick={onAddSalary} />
        {/* PASALE EL HANDLER COMO PROP */}
        <ViewDataButton onClick={handleScrollToData} />
      </div>
    </section>
  );
}