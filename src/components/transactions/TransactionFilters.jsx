import { Search, X, Download } from 'lucide-react';
import useStore from '../../store/useStore';
import { ALL_CATEGORIES } from '../../data/mockData';
import { exportToCSV, exportToJSON } from '../../utils/export';
import { useState, useRef, useEffect } from 'react';

export default function TransactionFilters() {
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);
  const getFilteredTransactions = useStore((s) => s.getFilteredTransactions);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    filters.search || filters.category !== 'all' || filters.type !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="input pl-9"
        />
      </div>

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => setFilter('category', e.target.value)}
        className="select w-full sm:w-auto"
      >
        <option value="all">All Categories</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        value={filters.type}
        onChange={(e) => setFilter('type', e.target.value)}
        className="select w-full sm:w-auto"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort */}
      <select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-');
          setFilter('sortBy', sortBy);
          setFilter('sortOrder', sortOrder);
        }}
        className="select w-full sm:w-auto"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="category-asc">Category A–Z</option>
        <option value="category-desc">Category Z–A</option>
      </select>

      {hasActiveFilters && (
        <button onClick={resetFilters} className="btn-secondary text-xs">
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}

      {/* Export Dropdown */}
      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setExportOpen(!exportOpen)}
          className="btn-secondary"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
        {exportOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-20 min-w-[120px] animate-fade-in">
            <button
              onClick={() => {
                exportToCSV(getFilteredTransactions());
                setExportOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={() => {
                exportToJSON(getFilteredTransactions());
                setExportOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Export JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
