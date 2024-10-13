/*"use client";
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

      if (!(response.ok)) {
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
*/

"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RemoveExpense({ setExpenses }) {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

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

      // The response is successful, expect the updated expenses
      const updatedExpenses = await response.json();
      //setExpenses(updatedExpenses.newExpenses);
      setMessage('Expense removed successfully'); // Set success message
    } catch (error) {
      console.error('Error removing expense:', error);
      setMessage(error.message || 'Error removing expense'); // Set error message
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

      <div className="bg-white shadow-md p-6 rounded">
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
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove Expense
        </button>

        {message && (
          <p className={`mt-4 text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default RemoveExpense;
