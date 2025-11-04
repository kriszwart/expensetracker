'use client';

import Container from '@/components/Container';
import SummaryCard from '@/components/SummaryCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import RecentExpenses from '@/components/RecentExpenses';
import SpendingChart from '@/components/SpendingChart';
import { useExpenseContext } from '@/components/ExpenseProvider';
import { calculateExpenseSummary } from '@/utils/expenseCalculations';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryIcon } from '@/utils/categoryHelpers';

export default function DashboardPage() {
  const { expenses, isLoading } = useExpenseContext();

  if (isLoading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading expenses...</p>
          </div>
        </div>
      </Container>
    );
  }

  const summary = calculateExpenseSummary(expenses);

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Track your expenses and manage your finances
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Spending"
          value={formatCurrency(summary.totalSpending)}
          icon="💰"
          description="All time"
          color="blue"
        />
        <SummaryCard
          title="This Month"
          value={formatCurrency(summary.monthlySpending)}
          icon="📅"
          description="Current month"
          color="green"
        />
        <SummaryCard
          title="Total Expenses"
          value={summary.expenseCount.toString()}
          icon="📊"
          description="Number of transactions"
          color="purple"
        />
        <SummaryCard
          title="Top Category"
          value={
            summary.topCategory.amount > 0
              ? formatCurrency(summary.topCategory.amount)
              : '$0.00'
          }
          icon={getCategoryIcon(summary.topCategory.category)}
          description={summary.topCategory.category}
          color="orange"
        />
      </div>

      {/* Charts and Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {summary.categoryBreakdown.filter((c) => c.total > 0).length > 0 ? (
          <CategoryBreakdown
            categoryData={summary.categoryBreakdown.filter((c) => c.total > 0)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Breakdown
            </h3>
            <p className="text-gray-500 text-center py-8">
              No expenses yet. Add expenses to see the breakdown!
            </p>
          </div>
        )}
        <RecentExpenses expenses={expenses} limit={5} />
      </div>

      {/* Spending Trend Chart */}
      <SpendingChart expenses={expenses} />
    </Container>
  );
}
