// components/AddSalaryButton.tsx
import { motion } from "framer-motion";

export function AddSalaryButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover="hover"
      className="group relative font-bold uppercase tracking-widest text-xl px-8 py-5 bg-transparent border-0 border-b-2 border-white/15 text-white outline-none select-none transition"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5 }}
    >
      <motion.span
        className="absolute inset-0 z-0"
        variants={{
          hover: { background: "linear-gradient(90deg,#14b8a680,#14b8a640)", scale: 1.04 },
          initial: { background: "transparent", scale: 1 }
        }}
        initial="initial"
        transition={{ duration: 0.26 }}
        aria-hidden
      />
      <span className="relative z-10">Agregar salario</span>
      <motion.span
        variants={{
          hover: { width: "100%", backgroundColor: "#14b8a6" },
          initial: { width: "0%", backgroundColor: "#fff0" }
        }}
        initial="initial"
        className="block h-0.5 absolute left-0 -bottom-1 bg-teal-400 z-20"
        transition={{ duration: 0.26 }}
        style={{ width: "0%" }}
      />
    </motion.button>
  );
}