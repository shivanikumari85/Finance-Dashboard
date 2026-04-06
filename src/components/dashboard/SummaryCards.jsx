import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { formatCurrency, formatPercent, getMonthKey } from '../../utils/formatters';
import useStore from '../../store/useStore';
import { useMemo } from 'react';

export default function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const prevMonth = now.getMonth() === 0
      ? `${now.getFullYear() - 1}-12`
      : `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

    const totalBalance = transactions.reduce(
      (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
      0
    );

    const currentTxns = transactions.filter((t) => getMonthKey(t.date) === currentMonth);
    const prevTxns = transactions.filter((t) => getMonthKey(t.date) === prevMonth);

    const monthIncome = currentTxns
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const monthExpenses = currentTxns
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);

    const prevIncome = prevTxns
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const prevExpenses = prevTxns
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);

    const incomeChange = prevIncome > 0 ? ((monthIncome - prevIncome) / prevIncome) * 100 : 0;
    const expenseChange = prevExpenses > 0 ? ((monthExpenses - prevExpenses) / prevExpenses) * 100 : 0;
    const savingsRate = monthIncome > 0 ? ((monthIncome - monthExpenses) / monthIncome) * 100 : 0;

    return {
      totalBalance,
      monthIncome,
      monthExpenses,
      savingsRate,
      incomeChange,
      expenseChange,
    };
  }, [transactions]);

  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(stats.totalBalance),
      icon: Wallet,
      color: 'text-brand-600 dark:text-brand-400',
      bg: 'bg-brand-50 dark:bg-brand-950/50',
      border: 'border-l-brand-500',
    },
    {
      label: 'Monthly Income',
      value: formatCurrency(stats.monthIncome),
      change: stats.incomeChange,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      border: 'border-l-emerald-500',
    },
    {
      label: 'Monthly Expenses',
      value: formatCurrency(stats.monthExpenses),
      change: stats.expenseChange,
      invertChange: true,
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/50',
      border: 'border-l-red-500',
    },
    {
      label: 'Savings Rate',
      value: `${stats.savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      border: 'border-l-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={`card border-l-4 ${card.border} p-4 sm:p-5 animate-slide-up`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {card.label}
            </span>
            <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </p>
          {card.change !== undefined && (
            <p
              className={`text-xs font-medium mt-1 ${
                (card.invertChange ? -card.change : card.change) >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatPercent(card.change)} vs last month
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
