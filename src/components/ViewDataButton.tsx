import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ViewDataButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.button
      onClick={onClick}
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      <span className="relative z-20 drop-shadow text-base md:text-sm font-bold">
        Ver datos
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="chevron"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.23, type: "tween" }}
            className="ml-0.5 flex"
          >
            <ChevronDown size={24} className="text-white drop-shadow-sm" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}