/*"use client";

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
*/

"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const UpdateExpense = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username'); // Get the username from search params
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

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
      setMessage('Expense updated successfully'); // Set success message
    } catch (error) {
      console.error('Error updating expense:', error);
      setMessage('Error updating expense'); // Set error message
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
            <Link href={`/logout`} className="text-white hover:text-gray-300">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="bg-white shadow-md p-6 rounded">
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

        {message && (
          <p className={`mt-4 text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateExpense;
