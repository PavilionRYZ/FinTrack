'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Sidebar, MobileNav } from '@/components/layout/sidebar';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { BalanceChart } from '@/components/dashboard/balance-chart';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { MonthlyChart } from '@/components/dashboard/monthly-chart';
import { TransactionList } from '@/components/transactions/transaction-list';
import { InsightsPanel } from '@/components/insights/insights-panel';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <main
          className={cn(
            'flex-1 transition-all duration-300 pb-20 lg:pb-8',
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          )}
        >
          <div className="mx-auto max-w-7xl p-4 lg:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6"
                >
                  {/* Page Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Dashboard Overview
                    </h2>
                    <p className="text-muted-foreground">
                      Track your financial activity at a glance
                    </p>
                  </div>

                  {/* Summary Cards */}
                  <SummaryCards />

                  {/* Charts Grid */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <BalanceChart />
                    <SpendingChart />
                  </div>

                  {/* Monthly Chart */}
                  <MonthlyChart />

                  {/* Recent Transactions Preview */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Recent Transactions
                    </h3>
                    <TransactionList />
                  </div>
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6"
                >
                  {/* Page Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Transactions
                    </h2>
                    <p className="text-muted-foreground">
                      View and manage all your financial transactions
                    </p>
                  </div>

                  {/* Transaction List */}
                  <TransactionList />
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6"
                >
                  {/* Page Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Financial Insights
                    </h2>
                    <p className="text-muted-foreground">
                      Understand your spending patterns and trends
                    </p>
                  </div>

                  {/* Insights Panel */}
                  <InsightsPanel />

                  {/* Charts for Context */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <SpendingChart />
                    <MonthlyChart />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
