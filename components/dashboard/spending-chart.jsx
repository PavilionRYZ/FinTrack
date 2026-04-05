'use client';

import { motion } from 'framer-motion';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useStore } from '@/lib/store';

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--muted-foreground)',
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="text-sm font-medium text-popover-foreground">
          {payload[0].name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SpendingChart() {
  const getSpendingByCategory = useStore((state) => state.getSpendingByCategory);
  const getTotalExpenses = useStore((state) => state.getTotalExpenses);
  
  const data = getSpendingByCategory().slice(0, 6);
  const totalExpenses = getTotalExpenses();

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-card-foreground">
          Spending Breakdown
        </h3>
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted-foreground">No expense data available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Spending Breakdown
        </h3>
        <p className="text-sm text-muted-foreground">By category</p>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-6">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex-1 lg:mt-0">
          <div className="grid gap-2">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-card-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-card-foreground">
                    {formatCurrency(item.value)}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({((item.value / totalExpenses) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
