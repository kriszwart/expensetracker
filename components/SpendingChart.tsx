import React from 'react';
import { Expense } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface SpendingChartProps {
  expenses: Expense[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ expenses }) => {
  // Group expenses by month
  const getMonthlyData = () => {
    const monthlyExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!monthlyExpenses[monthLabel]) {
        monthlyExpenses[monthLabel] = 0;
      }
      monthlyExpenses[monthLabel] += expense.amount;
    });

    // Get last 6 months
    const entries = Object.entries(monthlyExpenses).slice(-6);
    return entries;
  };

  const monthlyData = getMonthlyData();

  if (monthlyData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Spending Trend
        </h3>
        <p className="text-gray-500 text-center py-8">
          No data available yet. Add expenses to see your spending trend!
        </p>
      </div>
    );
  }

  const maxAmount = Math.max(...monthlyData.map(([_, amount]) => amount));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Monthly Spending Trend
      </h3>
      <div className="space-y-4">
        {monthlyData.map(([month, amount]) => {
          const percentage = (amount / maxAmount) * 100;
          return (
            <div key={month}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{month}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingChart;
