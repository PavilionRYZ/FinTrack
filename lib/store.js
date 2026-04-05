import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Mock data generator
const generateMockTransactions = () => {
  const categories = [
    { name: 'Food & Dining', type: 'expense' },
    { name: 'Shopping', type: 'expense' },
    { name: 'Transportation', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Healthcare', type: 'expense' },
    { name: 'Salary', type: 'income' },
    { name: 'Freelance', type: 'income' },
    { name: 'Investments', type: 'income' },
    { name: 'Gifts', type: 'income' },
  ];

  const descriptions = {
    'Food & Dining': ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Fast Food'],
    'Shopping': ['Online Shopping', 'Clothing Store', 'Electronics', 'Home Goods'],
    'Transportation': ['Gas Station', 'Uber Ride', 'Parking', 'Car Maintenance'],
    'Entertainment': ['Movie Theater', 'Streaming Service', 'Concert', 'Gaming'],
    'Utilities': ['Electric Bill', 'Water Bill', 'Internet', 'Phone Bill'],
    'Healthcare': ['Pharmacy', 'Doctor Visit', 'Gym Membership', 'Insurance'],
    'Salary': ['Monthly Salary', 'Bonus', 'Commission'],
    'Freelance': ['Project Payment', 'Consulting Fee', 'Design Work'],
    'Investments': ['Stock Dividend', 'Interest Income', 'Rental Income'],
    'Gifts': ['Birthday Gift', 'Holiday Gift', 'Cash Gift'],
  };

  const transactions = [];
  const today = new Date();

  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const descList = descriptions[category.name];
    const description = descList[Math.floor(Math.random() * descList.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const amount = category.type === 'income'
      ? Math.floor(Math.random() * 5000) + 500
      : Math.floor(Math.random() * 500) + 10;

    transactions.push({
      id: `txn-${i + 1}`,
      description,
      amount,
      category: category.name,
      type: category.type,
      date: date.toISOString().split('T')[0],
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const initialTransactions = generateMockTransactions();

export const useStore = create(
  persist(
    (set, get) => ({
      // User role state
      role: 'admin',
      setRole: (role) => set({ role }),

      // Theme state
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Transactions state
      transactions: initialTransactions,
      
      // Filter state
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        dateRange: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
      },
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      resetFilters: () => set({
        filters: {
          search: '',
          category: 'all',
          type: 'all',
          dateRange: 'all',
          sortBy: 'date',
          sortOrder: 'desc',
        }
      }),

      // Transaction CRUD operations
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          {
            ...transaction,
            id: `txn-${Date.now()}`,
          },
          ...state.transactions,
        ],
      })),

      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),

      // Computed values
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(searchLower) ||
              t.category.toLowerCase().includes(searchLower)
          );
        }

        // Category filter
        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        // Type filter
        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        // Date range filter
        if (filters.dateRange !== 'all') {
          const today = new Date();
          const ranges = {
            '7days': 7,
            '30days': 30,
            '90days': 90,
          };
          const days = ranges[filters.dateRange];
          if (days) {
            const startDate = new Date(today);
            startDate.setDate(startDate.getDate() - days);
            filtered = filtered.filter(
              (t) => new Date(t.date) >= startDate
            );
          }
        }

        // Sorting
        filtered.sort((a, b) => {
          let comparison = 0;
          switch (filters.sortBy) {
            case 'date':
              comparison = new Date(a.date) - new Date(b.date);
              break;
            case 'amount':
              comparison = a.amount - b.amount;
              break;
            case 'category':
              comparison = a.category.localeCompare(b.category);
              break;
            default:
              comparison = 0;
          }
          return filters.sortOrder === 'desc' ? -comparison : comparison;
        });

        return filtered;
      },

      getTotalBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => {
          return t.type === 'income' ? acc + t.amount : acc - t.amount;
        }, 0);
      },

      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getSpendingByCategory: () => {
        const { transactions } = get();
        const spending = {};
        transactions
          .filter((t) => t.type === 'expense')
          .forEach((t) => {
            spending[t.category] = (spending[t.category] || 0) + t.amount;
          });
        return Object.entries(spending)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);
      },

      getIncomeByCategory: () => {
        const { transactions } = get();
        const income = {};
        transactions
          .filter((t) => t.type === 'income')
          .forEach((t) => {
            income[t.category] = (income[t.category] || 0) + t.amount;
          });
        return Object.entries(income)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);
      },

      getMonthlyData: () => {
        const { transactions } = get();
        const monthlyData = {};
        
        transactions.forEach((t) => {
          const date = new Date(t.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0 };
          }
          
          if (t.type === 'income') {
            monthlyData[monthKey].income += t.amount;
          } else {
            monthlyData[monthKey].expenses += t.amount;
          }
        });

        return Object.values(monthlyData)
          .sort((a, b) => a.month.localeCompare(b.month))
          .slice(-6);
      },

      getBalanceTrend: () => {
        const { transactions } = get();
        const dailyData = {};
        
        // Get last 30 days
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateKey = date.toISOString().split('T')[0];
          dailyData[dateKey] = { date: dateKey, balance: 0 };
        }

        // Calculate running balance
        const sortedTransactions = [...transactions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        let runningBalance = 0;
        sortedTransactions.forEach((t) => {
          runningBalance += t.type === 'income' ? t.amount : -t.amount;
          if (dailyData[t.date]) {
            dailyData[t.date].balance = runningBalance;
          }
        });

        // Fill in missing balances
        const result = Object.values(dailyData);
        let lastBalance = 0;
        result.forEach((day, i) => {
          if (day.balance === 0 && i > 0) {
            day.balance = lastBalance;
          }
          lastBalance = day.balance;
        });

        return result;
      },

      getInsights: () => {
        const state = get();
        const spending = state.getSpendingByCategory();
        const monthlyData = state.getMonthlyData();
        const totalExpenses = state.getTotalExpenses();
        const totalIncome = state.getTotalIncome();

        const insights = [];

        // Highest spending category
        if (spending.length > 0) {
          const highest = spending[0];
          const percentage = ((highest.value / totalExpenses) * 100).toFixed(1);
          insights.push({
            type: 'spending',
            title: 'Top Spending Category',
            description: `${highest.name} accounts for ${percentage}% of your total expenses.`,
            value: highest.value,
          });
        }

        // Monthly comparison
        if (monthlyData.length >= 2) {
          const current = monthlyData[monthlyData.length - 1];
          const previous = monthlyData[monthlyData.length - 2];
          const expenseChange = current.expenses - previous.expenses;
          const changePercent = ((expenseChange / previous.expenses) * 100).toFixed(1);
          
          insights.push({
            type: expenseChange > 0 ? 'warning' : 'success',
            title: 'Monthly Expense Trend',
            description: expenseChange > 0
              ? `Expenses increased by ${changePercent}% compared to last month.`
              : `Expenses decreased by ${Math.abs(changePercent)}% compared to last month.`,
            value: Math.abs(expenseChange),
          });
        }

        // Savings rate
        const savingsRate = totalIncome > 0
          ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
          : 0;
        insights.push({
          type: savingsRate > 20 ? 'success' : savingsRate > 10 ? 'info' : 'warning',
          title: 'Savings Rate',
          description: `You're saving ${savingsRate}% of your income.`,
          value: totalIncome - totalExpenses,
        });

        // Transaction frequency
        const { transactions } = state;
        const avgTransactionsPerWeek = (transactions.length / 12).toFixed(1);
        insights.push({
          type: 'info',
          title: 'Transaction Activity',
          description: `You average ${avgTransactionsPerWeek} transactions per week.`,
          value: transactions.length,
        });

        return insights;
      },

      // Export functionality
      exportToJSON: () => {
        const { transactions } = get();
        return JSON.stringify(transactions, null, 2);
      },

      exportToCSV: () => {
        const { transactions } = get();
        const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
        const rows = transactions.map((t) => [
          t.id,
          t.date,
          t.description,
          t.category,
          t.type,
          t.amount,
        ]);
        return [headers, ...rows].map((row) => row.join(',')).join('\n');
      },
    }),
    {
      name: 'finance-dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
      }),
      skipHydration: true,
    }
  )
);

// Categories constant for use across components
export const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Salary',
  'Freelance',
  'Investments',
  'Gifts',
];

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Gifts',
];
