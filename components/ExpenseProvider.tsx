'use client';

import React, { createContext, useContext } from 'react';
import { Expense, ExpenseFormData } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';

interface ExpenseContextType {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (formData: ExpenseFormData) => Expense;
  updateExpense: (id: string, formData: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  clearAllExpenses: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const expenseData = useExpenses();

  return (
    <ExpenseContext.Provider value={expenseData}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};
