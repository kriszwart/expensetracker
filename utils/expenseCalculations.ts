import { Expense, ExpenseCategory, ExpenseSummary } from '@/types';

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  if (expenses.length === 0) {
    return {
      totalSpending: 0,
      monthlySpending: 0,
      categoryBreakdown: [],
      topCategory: { category: 'Other', amount: 0 },
      expenseCount: 0,
      averageExpense: 0,
    };
  }

  // Calculate total spending
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate monthly spending (current month)
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const monthlySpending = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calculate category breakdown
  const categoryTotals: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((expense) => {
    categoryTotals[expense.category] += expense.amount;
  });

  const categoryBreakdown = Object.entries(categoryTotals)
    .map(([category, total]) => ({
      category: category as ExpenseCategory,
      total,
      percentage: totalSpending > 0 ? (total / totalSpending) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  // Find top category
  const topCategory = categoryBreakdown[0] || {
    category: 'Other' as ExpenseCategory,
    total: 0,
  };

  return {
    totalSpending,
    monthlySpending,
    categoryBreakdown,
    topCategory: { category: topCategory.category, amount: topCategory.total },
    expenseCount: expenses.length,
    averageExpense: totalSpending / expenses.length,
  };
};

export const filterExpenses = (
  expenses: Expense[],
  filters: {
    category?: ExpenseCategory | 'All';
    startDate?: string;
    endDate?: string;
    searchQuery?: string;
  }
): Expense[] => {
  return expenses.filter((expense) => {
    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (expense.category !== filters.category) return false;
    }

    // Date range filter
    if (filters.startDate) {
      if (new Date(expense.date) < new Date(filters.startDate)) return false;
    }
    if (filters.endDate) {
      if (new Date(expense.date) > new Date(filters.endDate)) return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      const matchesAmount = expense.amount.toString().includes(query);

      if (!matchesDescription && !matchesCategory && !matchesAmount) return false;
    }

    return true;
  });
};

export const exportToCSV = (expenses: Expense[]): string => {
  const headers = ['Date', 'Category', 'Description', 'Amount'];
  const rows = expenses.map((expense) => [
    expense.date,
    expense.category,
    expense.description,
    expense.amount.toFixed(2),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string = 'expenses.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
