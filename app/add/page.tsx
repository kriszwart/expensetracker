'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import ExpenseForm from '@/components/ExpenseForm';
import { useExpenseContext } from '@/components/ExpenseProvider';
import { ExpenseFormData } from '@/types';
import { useState } from 'react';

export default function AddExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenseContext();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (formData: ExpenseFormData) => {
    addExpense(formData);
    setShowSuccess(true);

    // Show success message and redirect after a short delay
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/');
    }, 1500);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Expense</h1>
          <p className="text-gray-600">
            Record a new expense to track your spending
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Expense added successfully! Redirecting...</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <ExpenseForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
}
