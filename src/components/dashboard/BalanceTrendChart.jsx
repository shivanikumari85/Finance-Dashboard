import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useStore from '../../store/useStore';
import { formatCurrency, getMonthKey, formatMonth } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

export default function BalanceTrendChart() {
  const transactions = useStore((s) => s.transactions);
  const { dark } = useTheme();

  const data = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const monthMap = new Map();
    sorted.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!monthMap.has(key)) {
        monthMap.set(key, { income: 0, expenses: 0 });
      }
      const entry = monthMap.get(key);
      if (t.type === 'income') {
        entry.income += t.amount;
      } else {
        entry.expenses += t.amount;
      }
    });

    let runningBalance = 0;
    return Array.from(monthMap.entries()).map(([key, { income, expenses }]) => {
      runningBalance += income - expenses;
      return {
        month: formatMonth(`${key}-01`),
        income,
        expenses,
        balance: runningBalance,
      };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="card p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-900 dark:text-white mb-1.5">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="card p-4 sm:p-6 animate-fade-in">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Balance Trend
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={dark ? '#374151' : '#e5e7eb'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: dark ? '#9ca3af' : '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: dark ? '#9ca3af' : '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10b981"
              fill="url(#incomeGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#6366f1"
              fill="url(#balanceGradient)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
