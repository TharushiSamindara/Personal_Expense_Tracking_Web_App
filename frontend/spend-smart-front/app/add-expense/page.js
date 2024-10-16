/*"use client"; // Ensure this is at the top if using Next.js

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const AddExpense = ({ setExpenses }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // Extract username from the query parameter

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
    if (expenseAmount && expenseDate && expenseCategory && username) {
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
            username: username, // Include the username in the request body
            expense: newExpense,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        // Update the state to reflect the newly added expense
        setExpenses((prevExpenses) => {
          const existingExpenseIndex = prevExpenses.findIndex(
            (expense) => expense.name === newExpense.name && expense.date === newExpense.date
          );

          if (existingExpenseIndex >= 0) {
            const updatedExpenses = [...prevExpenses];
            updatedExpenses[existingExpenseIndex].amount += newExpense.amount;
            return updatedExpenses;
          } else {
            return [...prevExpenses, newExpense];
          }
        });

        // Reset input fields after successful addition
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    } else {
      alert('Please fill in all fields before adding an expense.');
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add Expense</h3>
      <div className="mb-4">
        <input
          type="number"
          value={expenseAmount}
          onChange={handleExpenseAmountChange}
          placeholder="Enter expense amount"
          className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={expenseDate}
          onChange={handleExpenseDateChange}
          className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={expenseCategory}
          onChange={handleExpenseCategoryChange}
          placeholder="Enter expense category"
          className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={handleAddExpense}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;*/



"use client"; // Ensure this is at the top if using Next.js

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const AddExpense = ({ setExpenses }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // Extract username from the query parameter

  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [message, setMessage] = useState('');

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
    if (expenseAmount && expenseDate && expenseCategory && username) {
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
            username: username, // Include the username in the request body
            expense: newExpense,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        // Update the state to reflect the newly added expense
        /*setExpenses((prevExpenses) => {
          const existingExpenseIndex = prevExpenses.findIndex(
            (expense) => expense.name === newExpense.name && expense.date === newExpense.date
          );

          if (existingExpenseIndex >= 0) {
            const updatedExpenses = [...prevExpenses];
            updatedExpenses[existingExpenseIndex].amount += newExpense.amount;
            return updatedExpenses;
          } else {
            return [...prevExpenses, newExpense];
          }
        });*/

        // Reset input fields after successful addition
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
        setMessage('Expense added successfully!'); // Set success message
      } catch (error) {
        console.error('Error adding expense:', error);
        setMessage('Error adding expense.'); // Set error message
      }
    } else {
      alert('Please fill in all fields before adding an expense.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Navigation Bar */}
      <nav className="bg-[#6495ED] p-4 rounded shadow-md mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-red-500">S</span>pend
            <span className="text-red-500">S</span>mart
          </Link>
          <div className="flex space-x-4">
            <Link href={`/dashboard?username=${username}`} className="text-white hover:text-gray-300">Dashboard</Link>
            <Link href={`/add-expense?username=${username}`} className="text-white hover:text-gray-300">Add Expense</Link>
            <Link href={`/expense-filter?username=${username}`} className="text-white hover:text-gray-300">Filter Expense</Link>
            <Link href={`/update-expense?username=${username}`} className="text-white hover:text-gray-300">Update Expense</Link>
            <Link href={`/remove-expense?username=${username}`} className="text-white hover:text-gray-300">Delete Expense</Link>
            <Link href={`/`} className="text-white hover:text-gray-300">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Expense</h3>
        {message && (
          <p className={`mb-4 text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <div className="mb-4">
          <input
            type="number"
            value={expenseAmount}
            onChange={handleExpenseAmountChange}
            placeholder="Enter expense amount"
            className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            value={expenseDate}
            onChange={handleExpenseDateChange}
            className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={expenseCategory}
            onChange={handleExpenseCategoryChange}
            placeholder="Enter expense category"
            className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpense;

