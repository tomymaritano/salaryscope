import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Cierra con ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Cierra al clickear backdrop (no el contenido)
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current) onClose();
  };

  if (!open) return null;
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center"
      onMouseDown={handleBackdrop}
    >
      <div className="relative w-full max-w-2xl p-0 m-4">
        {/* Cerrar */}
        <button
          className="absolute top-4 right-5 z-10 p-2 rounded-full text-gray-400 hover:text-teal-400 bg-transparent"
          onClick={onClose}
          aria-label="Cerrar modal"
          tabIndex={0}
        >
          <svg width={22} height={22} fill="none"><path d="M6 6l10 10M6 16L16 6" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        {children}
      </div>
    </div>
  );
}