"use client";
import React, { useState } from 'react';

const AddExpense = ({ username, setExpenses }) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(e.target.value);
  };

  const handleExpenseDateChange = (e) => {
    setExpenseDate(e.target.value);
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleAddExpense = async () => {
    if (expenseAmount && expenseDate && expenseCategory) {
      const newExpense = {
        name: expenseCategory,
        amount: parseFloat(expenseAmount),
        date: expenseDate,
      };

      try {
        const response = await fetch('http://localhost:8080/expense/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            newExpenses: [newExpense],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  return (
    <div>
      <h3>Add Expense:</h3>
      <input
        type="number"
        value={expenseAmount}
        onChange={handleExpenseAmountChange}
        placeholder="Enter expense amount"
      />
      <input
        type="date"
        value={expenseDate}
        onChange={handleExpenseDateChange}
      />
      <input
        type="text"
        value={expenseCategory}
        onChange={handleExpenseCategoryChange}
        placeholder="Enter expense category"
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;
