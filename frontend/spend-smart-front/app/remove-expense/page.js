"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function RemoveExpense({ setExpenses }) {
const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleRemoveExpense = async () => {
    if (!username) {
      alert('Username is required to remove an expense');
      return;
    }

    try {
      const requestBody = {
        username,
        name,
        amount: parseFloat(amount),
        date: date || undefined,
      };

      const response = await fetch('http://localhost:8080/expense/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to remove expense');
      }

      const updatedExpenses = await response.json();
      setExpenses(updatedExpenses.newExpenses);
      alert('Expense removed successfully');
    } catch (error) {
      console.error('Error removing expense:', error);
      alert('Error removing expense');
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Remove Expense</h3>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="date"
        placeholder="Date (optional)"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleRemoveExpense}
        className="w-full px-4 py-2 bg-red-500 text-white rounded"
      >
        Remove Expense
      </button>
    </div>
  );
}

export default RemoveExpense;
