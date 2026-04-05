'use client';

import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { useStore } from '@/lib/store';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const InsightIcon = ({ type }) => {
  const icons = {
    spending: FiTrendingDown,
    success: FiCheckCircle,
    warning: FiAlertCircle,
    info: FiInfo,
  };
  const Icon = icons[type] || FiInfo;
  return <Icon className="h-5 w-5" />;
};

const getInsightStyles = (type) => {
  const styles = {
    spending: 'bg-destructive/10 text-destructive',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning-foreground',
    info: 'bg-primary/10 text-primary',
  };
  return styles[type] || styles.info;
};

export function InsightsPanel() {
  const getInsights = useStore((state) => state.getInsights);
  const insights = getInsights();

  if (insights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-card-foreground">
          Financial Insights
        </h3>
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <FiInfo className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Not enough data for insights yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add more transactions to see personalized insights
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Financial Insights
        </h3>
        <p className="text-sm text-muted-foreground">
          Personalized observations about your finances
        </p>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-sm"
          >
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getInsightStyles(
                insight.type
              )}`}
            >
              <InsightIcon type={insight.type} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-card-foreground">
                  {insight.title}
                </h4>
                <span className="text-sm font-semibold text-muted-foreground">
                  {formatCurrency(insight.value)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {insight.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
