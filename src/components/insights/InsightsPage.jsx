import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { CATEGORY_COLORS } from '../../data/mockData';
import {
  formatCurrency,
  formatMonth,
  getMonthKey,
} from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

export default function InsightsPage() {
  const transactions = useStore((s) => s.transactions);
  const { dark } = useTheme();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const incomes = transactions.filter((t) => t.type === 'income');

    // Category totals
    const catTotals = {};
    expenses.forEach((t) => {
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });
    const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCats[0];
    const lowestCategory = sortedCats[sortedCats.length - 1];

    // Monthly data
    const monthlyData = new Map();
    transactions.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!monthlyData.has(key)) {
        monthlyData.set(key, { income: 0, expenses: 0 });
      }
      const entry = monthlyData.get(key);
      if (t.type === 'income') entry.income += t.amount;
      else entry.expenses += t.amount;
    });

    const monthlyChart = Array.from(monthlyData.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, data]) => ({
        month: formatMonth(`${key}-01`),
        Income: Math.round(data.income),
        Expenses: Math.round(data.expenses),
        Net: Math.round(data.income - data.expenses),
      }));

    // Month-over-month expense change
    const months = Array.from(monthlyData.entries()).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    let expenseChangePercent = 0;
    if (months.length >= 2) {
      const curr = months[months.length - 1][1].expenses;
      const prev = months[months.length - 2][1].expenses;
      expenseChangePercent = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
    }

    // Average transaction
    const avgExpense =
      expenses.length > 0
        ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length
        : 0;

    // Highest single expense
    const highestExpense = expenses.reduce(
      (max, t) => (t.amount > (max?.amount || 0) ? t : max),
      null
    );

    // Total income vs expense
    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const incomeExpenseRatio =
      totalExpense > 0 ? totalIncome / totalExpense : 0;

    // Expense frequency by category
    const catCounts = {};
    expenses.forEach((t) => {
      catCounts[t.category] = (catCounts[t.category] || 0) + 1;
    });
    const mostFrequentCategory = Object.entries(catCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      topCategory,
      lowestCategory,
      monthlyChart,
      expenseChangePercent,
      avgExpense,
      highestExpense,
      totalIncome,
      totalExpense,
      incomeExpenseRatio,
      mostFrequentCategory,
      sortedCats,
    };
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="card p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-900 dark:text-white mb-1.5">
          {label}
        </p>
        {payload.map((entry) => (
          <p
            key={entry.name}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
          >
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

  const metricCards = [
    {
      label: 'Top Spending Category',
      value: insights.topCategory?.[0] || 'N/A',
      detail: insights.topCategory
        ? formatCurrency(insights.topCategory[1])
        : '',
      icon: ShoppingBag,
      color:
        CATEGORY_COLORS[insights.topCategory?.[0]] || '#6366f1',
    },
    {
      label: 'Average Expense',
      value: formatCurrency(insights.avgExpense),
      detail: `across ${transactions.filter((t) => t.type === 'expense').length} transactions`,
      icon: DollarSign,
      color: '#f59e0b',
    },
    {
      label: 'Expense Trend',
      value: `${insights.expenseChangePercent >= 0 ? '+' : ''}${insights.expenseChangePercent.toFixed(1)}%`,
      detail: 'vs previous month',
      icon:
        insights.expenseChangePercent >= 0 ? ArrowUpRight : ArrowDownRight,
      color: insights.expenseChangePercent >= 0 ? '#ef4444' : '#10b981',
    },
    {
      label: 'Income / Expense Ratio',
      value: `${insights.incomeExpenseRatio.toFixed(2)}x`,
      detail:
        insights.incomeExpenseRatio >= 1
          ? 'Earning more than spending'
          : 'Spending exceeds income',
      icon: BarChart3,
      color: insights.incomeExpenseRatio >= 1 ? '#10b981' : '#ef4444',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <div
            key={card.label}
            className="card p-4 sm:p-5 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon
                  className="w-5 h-5"
                  style={{ color: card.color }}
                />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <div className="card p-4 sm:p-6 animate-fade-in">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Income vs Expenses
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={insights.monthlyChart}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
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
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category Ranking */}
        <div className="card p-4 sm:p-6 animate-fade-in">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Spending by Category
          </h2>
          <div className="space-y-3">
            {insights.sortedCats.map(([cat, amount], i) => {
              const maxAmount = insights.sortedCats[0][1];
              const percentage = (amount / maxAmount) * 100;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[cat] || '#94a3b8',
                        }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {cat}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          CATEGORY_COLORS[cat] || '#94a3b8',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Observations */}
        <div className="card p-4 sm:p-6 animate-fade-in">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Key Observations
          </h2>
          <div className="space-y-4">
            <Observation
              icon={TrendingUp}
              color="text-emerald-600 dark:text-emerald-400"
              bg="bg-emerald-50 dark:bg-emerald-950/30"
              title="Total Earnings"
              text={`You've earned ${formatCurrency(insights.totalIncome)} over the tracked period.`}
            />
            <Observation
              icon={TrendingDown}
              color="text-red-600 dark:text-red-400"
              bg="bg-red-50 dark:bg-red-950/30"
              title="Total Spending"
              text={`Total expenses amount to ${formatCurrency(insights.totalExpense)}, with ${insights.topCategory?.[0] || 'N/A'} being the biggest contributor.`}
            />
            {insights.highestExpense && (
              <Observation
                icon={AlertCircle}
                color="text-amber-600 dark:text-amber-400"
                bg="bg-amber-50 dark:bg-amber-950/30"
                title="Largest Single Expense"
                text={`"${insights.highestExpense.description}" on ${insights.highestExpense.date} for ${formatCurrency(insights.highestExpense.amount)}.`}
              />
            )}
            {insights.mostFrequentCategory && (
              <Observation
                icon={ShoppingBag}
                color="text-brand-600 dark:text-brand-400"
                bg="bg-brand-50 dark:bg-brand-950/30"
                title="Most Frequent Expense"
                text={`${insights.mostFrequentCategory[0]} appears ${insights.mostFrequentCategory[1]} times — consider if there are ways to optimize.`}
              />
            )}
            {insights.lowestCategory && (
              <Observation
                icon={DollarSign}
                color="text-teal-600 dark:text-teal-400"
                bg="bg-teal-50 dark:bg-teal-950/30"
                title="Lowest Spending Category"
                text={`${insights.lowestCategory[0]} at ${formatCurrency(insights.lowestCategory[1])} — great discipline here!`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Observation({ icon: Icon, color, bg, title, text }) {
  return (
    <div className={`flex gap-3 p-3 rounded-lg ${bg}`}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className={`text-sm font-semibold ${color}`}>{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          {text}
        </p>
      </div>
    </div>
  );
}
