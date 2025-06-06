// components/Stat.tsx
import { motion, AnimatePresence } from "framer-motion";

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={label + value}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ type: "spring", duration: 0.34 }}
        className="flex flex-col min-w-[130px] pb-2 mr-10"
      >
        <span className="text-3xl md:text-4xl font-black text-white">{value}</span>
        <span className="text-xs text-gray-500 mt-1 uppercase font-medium tracking-wide">{label}</span>
      </motion.div>
    </AnimatePresence>
  );
}