import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";

// (No te olvides del shimmer del ejemplo anterior en el CSS global)

export function AddSalaryButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("buttons");
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label={t("addSalary")}
      className={`
        group relative flex items-center justify-center gap-3
        w-full md:w-auto
        px-5 py-3 md:px-6 md:py-3
        rounded-none-xl md:rounded-none-none
        shadow-lg bg-black/70 border border-teal-600/30
        text-white font-bold uppercase text-base md:text-sm tracking-wide
        backdrop-blur-lg
        transition-all
        focus:outline-none focus:ring-2 focus:ring-teal-400/50
        active:scale-95
        overflow-hidden
      `}
      whileHover={{
        scale: 1.03,
        borderColor: "#20e6c3",
        boxShadow: "0 0 0 3px rgba(32,230,195,0.13), 0 2px 16px 0 #14b8a62c",
        filter: "blur(0.5px)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16, duration: 0.36, type: "spring" }}
    >
      {/* Shimmer sólo visible en desktop hover */}
      <motion.div
        aria-hidden
        className="hidden md:block absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.28 }}
      >
        <motion.div
          className="absolute -top-3 -left-20 w-24 h-24 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-[2px]"
          initial={{ x: -120 }}
          animate={{ x: 300 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.4,
            delay: 0.1,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Línea shimmer abajo: SIEMPRE visible */}
      <span className="pointer-events-none absolute left-0 bottom-0 w-full h-0.5">
        <span className="block w-1/3 h-full bg-gradient-to-r from-transparent via-teal-300 to-transparent animate-salary-shimmer" />
      </span>

      <UploadCloud size={26} className="text-white drop-shadow-sm md:text-white" />
      <span className="relative z-20 drop-shadow text-base md:text-sm font-bold">
        {t("addSalary")}
      </span>
    </motion.button>
  );
}