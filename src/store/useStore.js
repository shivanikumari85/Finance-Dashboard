import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initialTransactions from '../data/mockData';

const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  type: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

const useStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      activePage: 'dashboard',
      activeRole: 'admin',
      filters: { ...DEFAULT_FILTERS },
      sidebarOpen: false,

      setActivePage: (page) => set({ activePage: page, sidebarOpen: false }),
      setActiveRole: (role) => set({ activeRole: role }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

      addTransaction: (txn) =>
        set((s) => ({
          transactions: [
            { ...txn, id: crypto.randomUUID() },
            ...s.transactions,
          ],
        })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }

        if (filters.category !== 'all') {
          result = result.filter((t) => t.category === filters.category);
        }

        if (filters.type !== 'all') {
          result = result.filter((t) => t.type === filters.type);
        }

        result.sort((a, b) => {
          let cmp = 0;
          if (filters.sortBy === 'date') {
            cmp = new Date(a.date) - new Date(b.date);
          } else if (filters.sortBy === 'amount') {
            cmp = a.amount - b.amount;
          } else if (filters.sortBy === 'category') {
            cmp = a.category.localeCompare(b.category);
          }
          return filters.sortOrder === 'desc' ? -cmp : cmp;
        });

        return result;
      },
    }),
    {
      name: 'finsight-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        activeRole: state.activeRole,
        activePage: state.activePage,
      }),
    }
  )
);

export default useStore;
