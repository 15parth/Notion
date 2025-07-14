// src/Pagination.tsx

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-slate-700/60 disabled:opacity-40"
      >
        ⬅ Prev
      </button>

      <span className="px-4 font-semibold">{page} / {totalPages}</span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-slate-700/60 disabled:opacity-40"
      >
        Next ➡
      </button>
    </div>
  );
}
