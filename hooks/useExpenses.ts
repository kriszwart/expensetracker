'use client';

import { useState, useEffect, useCallback } from 'react';
import { Expense, ExpenseFormData } from '@/types';
import { loadExpenses, saveExpenses } from '@/utils/localStorage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const loaded = loadExpenses();
    setExpenses(loaded);
    setIsLoading(false);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveExpenses(expenses);
    }
  }, [expenses, isLoading]);

  const addExpense = useCallback((formData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  }, []);

  const updateExpense = useCallback((id: string, formData: ExpenseFormData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              date: formData.date,
              amount: parseFloat(formData.amount),
              category: formData.category,
              description: formData.description,
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  return {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAllExpenses,
  };
};
