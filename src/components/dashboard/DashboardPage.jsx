import SummaryCards from './SummaryCards';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdownChart from './SpendingBreakdownChart';
import useStore from '../../store/useStore';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function DashboardPage() {
  const transactions = useStore((s) => s.transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div>
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-4 sm:p-6 animate-fade-in">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {recentTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    t.type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {t.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.category} · {formatDate(t.date)}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold flex-shrink-0 ml-3 ${
                  t.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
