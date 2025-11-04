import { ExpenseCategory } from '@/types';

export const categoryColors: Record<ExpenseCategory, string> = {
  Food: '#10b981', // green
  Transportation: '#3b82f6', // blue
  Entertainment: '#f59e0b', // amber
  Shopping: '#ec4899', // pink
  Bills: '#ef4444', // red
  Other: '#6b7280', // gray
};

export const categoryIcons: Record<ExpenseCategory, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '📄',
  Other: '📦',
};

export const allCategories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const getCategoryColor = (category: ExpenseCategory): string => {
  return categoryColors[category] || categoryColors.Other;
};

export const getCategoryIcon = (category: ExpenseCategory): string => {
  return categoryIcons[category] || categoryIcons.Other;
};
