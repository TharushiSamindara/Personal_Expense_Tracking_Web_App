/*"use client";
import React, { useState } from 'react';

const SetMaxExpense = ({ username }) => {
  const [maxExpense, setMaxExpense] = useState(0);

  const handleSetMaxExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/expense/set-max-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, maxMonthlyExpense: maxExpense }),
      });

      if (!response.ok) {
        throw new Error('Failed to set maximum expense');
      }

      const data = await response.json();
      console.log('Max expense set:', data);
      alert('Maximum monthly expense set successfully!');
    } catch (error) {
      console.error('Error setting maximum expense:', error);
    }
  };

  return (
    <div>
      <h3>Set Maximum Monthly Expense</h3>
      <form onSubmit={handleSetMaxExpense}>
        <input
          type="number"
          value={maxExpense}
          onChange={(e) => setMaxExpense(e.target.value)}
          required
          placeholder="Enter max expense amount"
        />
        <button type="submit">Set Max Expense</button>
      </form>
    </div>
  );
};

export default SetMaxExpense;
*/
