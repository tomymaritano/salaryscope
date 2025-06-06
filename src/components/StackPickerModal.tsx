// components/StackPickerModal.tsx
import { useEffect, useRef, useState } from 'react';

interface StackPickerModalProps {
  stacks: { label: string; value: string }[];
  selected: string[];
  onSelect: (stack: string) => void;
  onRemove: (stack: string) => void;
  onClose: () => void;
}

export default function StackPickerModal({
  stacks,
  selected,
  onSelect,
  onRemove,
  onClose,
}: StackPickerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  // Escape para cerrar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Búsqueda
  const filtered = search
    ? stacks.filter(s =>
        s.label.toLowerCase().includes(search.toLowerCase())
      )
    : stacks;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl p-6 w-[95vw] max-w-md outline-none border border-gray-200 dark:border-gray-700"
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-label="Seleccionar tecnologías"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-base sm:text-lg">Seleccioná tecnologías</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1 transition hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-teal-400"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar tecnología..."
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm mb-3 focus:ring-2 focus:ring-teal-400 outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Buscar tecnologías"
        />
        <div className="max-h-52 overflow-auto mb-3">
          {filtered.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 px-2 text-xs">No hay resultados.</div>
          )}
          {filtered.map(stack => (
            <label
              key={stack.value}
              className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(stack.value)}
                onChange={() =>
                  selected.includes(stack.value)
                    ? onRemove(stack.value)
                    : onSelect(stack.value)
                }
                className="accent-teal-600"
              />
              {stack.label}
            </label>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white w-full font-medium transition"
        >
          Confirmar selección
        </button>
      </div>
    </div>
  );
}