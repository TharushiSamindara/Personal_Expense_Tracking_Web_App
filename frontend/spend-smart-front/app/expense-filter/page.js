/*"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';


function ExpenseFilter() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/filter', {
        params: {
          username,
          date: filterByDate ? date : undefined,
          name: filterByName ? name : undefined,
        },
      });
      setFilteredData(response.data); // Store filtered data in state
    } catch (error) {
      console.error('Error filtering expenses:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter Expenses</h2>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByDate}
            onChange={() => setFilterByDate(!filterByDate)}
          />
          Filter by Date
        </label>
        {filterByDate && (
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
      </div>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByName}
            onChange={() => setFilterByName(!filterByName)}
          />
          Filter by Name (Category)
        </label>
        {filterByName && (
          <input
            type="text"
            placeholder="Enter category name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>
      
      <button 
        onClick={handleFilter} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Filter
      </button>

      
      {filteredData.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Filtered Expenses:</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{expense.name}</td>
                  <td className="py-2 px-4 border-b">{expense.amount}</td>
                  <td className="py-2 px-4 border-b">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseFilter;*/


"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ExpenseFilter() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/filter', {
        params: {
          username,
          date: filterByDate ? date : undefined,
          name: filterByName ? name : undefined,
        },
      });
      setFilteredData(response.data); // Store filtered data in state
    } catch (error) {
      console.error('Error filtering expenses:', error);
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter Expenses</h2>
        
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filterByDate}
              onChange={() => setFilterByDate(!filterByDate)}
            />
            Filter by Date
          </label>
          {filterByDate && (
            <input
              type="date"
              className="border p-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}
        </div>
        
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={filterByName}
              onChange={() => setFilterByName(!filterByName)}
            />
            Filter by Name (Category)
          </label>
          {filterByName && (
            <input
              type="text"
              placeholder="Enter category name"
              className="border p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        
        <button 
          onClick={handleFilter} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>

        {/* Display filtered data in a table */}
        {filteredData.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2">Filtered Expenses:</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{expense.name}</td>
                    <td className="py-2 px-4 border-b">{expense.amount}</td>
                    <td className="py-2 px-4 border-b">{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseFilter;

