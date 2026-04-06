import { Pencil, Trash2 } from 'lucide-react';
import useStore from '../../store/useStore';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';
import EmptyState from '../ui/EmptyState';
import { useState } from 'react';

export default function TransactionTable({ onEdit }) {
  const getFilteredTransactions = useStore((s) => s.getFilteredTransactions);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const activeRole = useStore((s) => s.activeRole);
  const isAdmin = activeRole === 'admin';

  const transactions = getFilteredTransactions();

  const [page, setPage] = useState(0);
  const perPage = 10;
  const totalPages = Math.ceil(transactions.length / perPage);
  const paginated = transactions.slice(page * perPage, (page + 1) * perPage);

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try changing your filters or add a new transaction."
      />
    );
  }

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="text-left py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                Description
              </th>
              <th className="text-left py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="text-left py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="text-right py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                Amount
              </th>
              {isAdmin && (
                <th className="text-right py-3 px-3 font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3 px-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>
                <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">
                  {t.description}
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                    />
                    <span className="text-gray-600 dark:text-gray-400">
                      {t.category}
                    </span>
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                <td
                  className={`py-3 px-3 text-right font-semibold whitespace-nowrap ${
                    t.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </td>
                {isAdmin && (
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(t)}
                        className="p-1.5 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {paginated.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {t.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatDate(t.date)}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ml-3 ${
                  t.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t.category}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    t.type === 'income'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                  }`}
                >
                  {t.type}
                </span>
              </div>
              {isAdmin && (
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 text-gray-400 hover:text-brand-600 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, transactions.length)} of{' '}
            {transactions.length}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 text-sm rounded-md transition-colors ${
                  page === i
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
