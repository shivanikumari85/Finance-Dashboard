import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useStore from '../../store/useStore';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function SpendingBreakdownChart() {
  const transactions = useStore((s) => s.transactions);

  const data = useMemo(() => {
    const catTotals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(catTotals)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    return (
      <div className="card p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-gray-600 dark:text-gray-300">
          {formatCurrency(value)} ({((value / total) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  };

  return (
    <div className="card p-4 sm:p-6 animate-fade-in">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Spending Breakdown
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="h-56 w-56 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 min-w-0">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[entry.name] || '#94a3b8' }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {entry.name}
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-200 ml-auto flex-shrink-0">
                {((entry.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
