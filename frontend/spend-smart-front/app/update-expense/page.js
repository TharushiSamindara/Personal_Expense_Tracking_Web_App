// app/update-expense/UpdateExpense.js
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const UpdateExpense = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // Get the username from search params
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleUpdateExpense = async () => {
    try {
      const response = await fetch('http://localhost:8080/expense/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, amount: parseFloat(amount), date }),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      const updatedExpenses = await response.json();
      alert('Expense updated successfully');
      // Handle local state updates here if needed
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Error updating expense');
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Update Expense</h3>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="New Amount"
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
        onClick={handleUpdateExpense}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Update Expense
      </button>
    </div>
  );
};

export default UpdateExpense;
