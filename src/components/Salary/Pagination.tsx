interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="brutal-input w-24 text-xs font-black border-2 border-teal-400 rounded bg-[#111214] text-teal-400 hover:bg-teal-800/30 hover:text-white transition disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-xs font-black px-3">
        Página {page} / {pageCount}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="brutal-input w-24 text-xs font-black border-2 border-teal-400 rounded bg-[#111214] text-teal-400 hover:bg-teal-800/30 hover:text-white transition disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}