"use client";

import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
} from "react-icons/fi";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function SummaryCards() {
  const [mounted, setMounted] = useState(false);

  const getTotalBalance = useStore((state) => state.getTotalBalance);
  const getTotalIncome = useStore((state) => state.getTotalIncome);
  const getTotalExpenses = useStore((state) => state.getTotalExpenses);
  const transactions = useStore((state) => state.transactions);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚨 Prevent SSR mismatch
  if (!mounted) {
    return null; // or skeleton loader
  }

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const savingsRate =
    income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(balance),
      icon: FiDollarSign,
      change: balance >= 0 ? "+" : "",
      changeType: balance >= 0 ? "positive" : "negative",
      description: "Current account balance",
    },
    {
      title: "Total Income",
      value: formatCurrency(income),
      icon: FiTrendingUp,
      change: `+${transactions.filter((t) => t.type === "income").length}`,
      changeType: "positive",
      description: "This period",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(expenses),
      icon: FiTrendingDown,
      change: `-${transactions.filter((t) => t.type === "expense").length}`,
      changeType: "negative",
      description: "This period",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: FiActivity,
      change:
        savingsRate > 20 ? "Excellent" : savingsRate > 10 ? "Good" : "Low",
      changeType: savingsRate > 10 ? "positive" : "negative",
      description: "Of total income",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
            <span
              className={`text-xs font-medium ${
                card.changeType === "positive"
                  ? "text-success"
                  : "text-destructive"
              }`}
            >
              {card.change}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card.title}
            </h3>
            <p className="mt-1 text-2xl font-bold text-card-foreground">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {card.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
