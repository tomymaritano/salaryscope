// components/StackChips.tsx
import { AnimatePresence, motion } from 'framer-motion';

export function StackChips({
  stacks,
  onRemove,
}: {
  stacks: { label: string; value: string }[];
  onRemove: (stack: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <AnimatePresence>
        {stacks.map(stack => (
          <motion.span
            key={stack.value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="flex items-center gap-1 
              bg-[#232326] border border-[#28282a] 
              text-gray-200 px-3 py-1 rounded-none-lg shadow-sm text-xs
              select-none"
            tabIndex={0}
            aria-label={`Eliminar ${stack.label}`}
          >
            {stack.label}
            <button
              onClick={() => onRemove(stack.value)}
              className="ml-1 text-gray-400 hover:text-teal-400 focus:outline-none focus:ring-0 transition"
              aria-label={`Eliminar ${stack.label}`}
              type="button"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <path d="M4 4l8 8M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}