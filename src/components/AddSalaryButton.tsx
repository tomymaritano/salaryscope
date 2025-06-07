import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react"; // Instala: npm i lucide-react

export function AddSalaryButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      className="group relative flex items-center gap-2 px-5 py-3 rounded-none shadow-md bg-[#18191c]/80 border border-teal-600/30 text-white font-bold uppercase text-sm tracking-wide backdrop-blur-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-400/50"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 4px 18px 0 #14b8a650",
        backgroundColor: "#232326cc",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.38, type: "spring" }}
    >
      {/* Shimmer en hover */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.32 }}
      >
        <motion.div
          className="absolute -top-3 -left-20 w-24 h-24 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-[2px]"
          initial={{ x: -120 }}
          animate={{ x: 300 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            delay: 0.1,
            ease: "linear"
          }}
        />
      </motion.div>
      <PlusCircle size={20} className="text-teal-200 drop-shadow-sm" />
      <span className="relative z-20 drop-shadow">Agregar salario</span>
    </motion.button>
  );
}