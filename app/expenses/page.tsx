'use client';

import { useState, useMemo } from 'react';
import Container from '@/components/Container';
import ExpenseFilters from '@/components/ExpenseFilters';
import ExpenseListItem from '@/components/ExpenseListItem';
import ExpenseForm from '@/components/ExpenseForm';
import { useExpenseContext } from '@/components/ExpenseProvider';
import { Expense, ExpenseFilters as IExpenseFilters, ExpenseFormData } from '@/types';
import { filterExpenses, exportToCSV, downloadCSV } from '@/utils/expenseCalculations';
import { formatCurrency } from '@/utils/formatters';

export default function ExpensesPage() {
  const { expenses, updateExpense, deleteExpense, isLoading } = useExpenseContext();
  const [filters, setFilters] = useState<IExpenseFilters>({
    category: 'All',
    searchQuery: '',
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = useMemo(() => {
    return filterExpenses(expenses, filters);
  }, [expenses, filters]);

  const totalFilteredAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = (formData: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
      setEditingExpense(null);
    }
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(filteredExpenses);
    downloadCSV(csv, `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  };

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

  return (
    <Container>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">All Expenses</h1>
          <button
            onClick={handleExportCSV}
            disabled={filteredExpenses.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
        </div>
        <p className="text-gray-600">
          Manage and track all your expenses
        </p>
      </div>

      <ExpenseFilters filters={filters} onFilterChange={setFilters} />

      {/* Summary Bar */}
      {filteredExpenses.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-700">
                Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-700">Total Amount</p>
              <p className="text-2xl font-bold text-primary-900">
                {formatCurrency(totalFilteredAmount)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expense List */}
      {filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No expenses found
          </h3>
          <p className="text-gray-600 mb-6">
            {expenses.length === 0
              ? "You haven't added any expenses yet. Start tracking your spending!"
              : 'Try adjusting your filters to see more results.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <ExpenseListItem
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={deleteExpense}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Expense</h2>
              <button
                onClick={() => setEditingExpense(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <ExpenseForm
              onSubmit={handleUpdate}
              initialData={editingExpense}
              submitButtonText="Update Expense"
              isEditing={true}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
