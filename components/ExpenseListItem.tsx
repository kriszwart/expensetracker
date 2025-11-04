'use client';

import React, { useState } from 'react';
import { Expense } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getCategoryIcon, getCategoryColor } from '@/utils/categoryHelpers';

interface ExpenseListItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(expense.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: getCategoryColor(expense.category) + '20' }}
          >
            {getCategoryIcon(expense.category)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                {expense.description}
              </h3>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(expense.amount)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span
                className="px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: getCategoryColor(expense.category) + '20',
                  color: getCategoryColor(expense.category),
                }}
              >
                {expense.category}
              </span>
              <span>•</span>
              <span>{formatDate(expense.date)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit expense"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete expense"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Expense?
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this expense? This action cannot be
              undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseListItem;
