import React from 'react';
import { ExpenseCategory } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryColor, getCategoryIcon } from '@/utils/categoryHelpers';

interface CategoryBreakdownProps {
  categoryData: {
    category: ExpenseCategory;
    total: number;
    percentage: number;
  }[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categoryData,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Category Breakdown
      </h3>
      <div className="space-y-4">
        {categoryData.map((item) => (
          <div key={item.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xl mr-2">
                  {getCategoryIcon(item.category)}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {item.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.total)}
                </div>
                <div className="text-xs text-gray-500">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: getCategoryColor(item.category),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
