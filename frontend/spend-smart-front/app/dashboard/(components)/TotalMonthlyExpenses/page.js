"use client";

import React, { useState } from 'react';

function TotalMonthlyExpenses({ username }) {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [error, setError] = useState('');

  const handleFetchTotalMonthlyExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/expense/total-monthly?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch total monthly expenses');
      }

      const data = await response.json();
      setTotalExpenses(data.totalExpenses);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error fetching total monthly expenses:', error);
      setError('Error fetching total monthly expenses');
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Total Monthly Expenses</h3>
      <button
        onClick={handleFetchTotalMonthlyExpenses}
        className="w-full px-4 py-2 bg-green-500 text-white rounded mb-2"
      >
        Get Total Expenses
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <p className="font-semibold">Total Expenses: LKR {totalExpenses}</p>
    </div>
  );
}

export default TotalMonthlyExpenses;
