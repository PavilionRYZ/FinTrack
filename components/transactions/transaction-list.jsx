'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiArrowUp,
  FiArrowDown,
  FiX,
} from 'react-icons/fi';
import { useStore, CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

function TransactionForm({ transaction, onSave, onClose }) {
  const [formData, setFormData] = useState(
    transaction || {
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    }
  );

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter description"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value, category: '' })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {transaction ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
}

export function TransactionList() {
  const role = useStore((state) => state.role);
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const resetFilters = useStore((state) => state.resetFilters);
  const getFilteredTransactions = useStore((state) => state.getFilteredTransactions);
  const addTransaction = useStore((state) => state.addTransaction);
  const updateTransaction = useStore((state) => state.updateTransaction);
  const deleteTransaction = useStore((state) => state.deleteTransaction);

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const transactions = getFilteredTransactions();
  const isAdmin = role === 'admin';

  const handleSaveNew = (transaction) => {
    addTransaction(transaction);
  };

  const handleSaveEdit = (transaction) => {
    updateTransaction(editingTransaction.id, transaction);
    setEditingTransaction(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-border p-4 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              {transactions.length} transactions found
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 lg:flex-none">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="w-full pl-9 lg:w-[250px]"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-muted' : ''}
            >
              <FiFilter className="h-4 w-4" />
            </Button>

            {/* Add Transaction (Admin only) */}
            {isAdmin && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <FiPlus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new transaction to your records.
                    </DialogDescription>
                  </DialogHeader>
                  <TransactionForm
                    onSave={handleSaveNew}
                    onClose={() => setIsAddDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid gap-4 rounded-lg bg-muted/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="grid gap-2">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters({ category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({ type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">Date Range</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters({ dateRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">Sort By</Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters({ sortBy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">Order</Label>
                  <Select
                    value={filters.sortOrder}
                    onValueChange={(value) => setFilters({ sortOrder: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end sm:col-span-2 lg:col-span-5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-muted-foreground"
                  >
                    <FiX className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-border">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or add a new transaction
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {transactions.slice(0, 10).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50 lg:p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <FiArrowUp className="h-5 w-5" />
                    ) : (
                      <FiArrowDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {transaction.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === 'income'
                        ? 'text-success'
                        : 'text-destructive'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>

                  {isAdmin && (
                    <div className="flex gap-1">
                      <Dialog
                        open={isEditDialogOpen && editingTransaction?.id === transaction.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (!open) setEditingTransaction(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTransaction(transaction)}
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Transaction</DialogTitle>
                            <DialogDescription>
                              Update the transaction details below.
                            </DialogDescription>
                          </DialogHeader>
                          {editingTransaction && (
                            <TransactionForm
                              transaction={editingTransaction}
                              onSave={handleSaveEdit}
                              onClose={() => {
                                setIsEditDialogOpen(false);
                                setEditingTransaction(null);
                              }}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(transaction.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {transactions.length > 10 && (
        <div className="border-t border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Showing 10 of {transactions.length} transactions
          </p>
        </div>
      )}
    </motion.div>
  );
}
