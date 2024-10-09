"use client"; // Ensure this is at the top if using Next.js
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
        const response = await fetch('http://localhost:8080/expense/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username, // Include the username
            expense: newExpense, // Change `newExpenses` to `expense`
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        // Update the expenses state
        setExpenses((prevExpenses) => {
          const existingExpenseIndex = prevExpenses.findIndex(
            (expense) => expense.name === newExpense.name && expense.date === newExpense.date
          );

          if (existingExpenseIndex >= 0) {
            // If an expense with the same name and date exists, update its amount
            const updatedExpenses = [...prevExpenses];
            updatedExpenses[existingExpenseIndex].amount += newExpense.amount;
            return updatedExpenses;
          } else {
            // Otherwise, add the new expense to the list
            return [...prevExpenses, newExpense];
          }
        });

        // Reset the input fields
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
