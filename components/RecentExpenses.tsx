import React from 'react';
import Link from 'next/link';
import { Expense } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getCategoryIcon } from '@/utils/categoryHelpers';

interface RecentExpensesProps {
  expenses: Expense[];
  limit?: number;
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({
  expenses,
  limit = 5,
}) => {
  const recentExpenses = expenses.slice(0, limit);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        <Link
          href="/expenses"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All →
        </Link>
      </div>
      {recentExpenses.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No expenses yet. Add your first expense to get started!
        </p>
      ) : (
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {getCategoryIcon(expense.category)}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {expense.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {expense.category} • {formatDate(expense.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentExpenses;
