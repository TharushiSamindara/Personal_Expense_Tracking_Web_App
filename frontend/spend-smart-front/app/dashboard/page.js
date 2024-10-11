/*
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddExpense from './(components)/AddExpense/page.js';  // Import the AddExpense component
import ExpensesStructure from './(components)/ExpensesStructure/page.js';
import DailyExpenses from './(components)/DailyExpenses/page.js';
import TotalExpenses from './(components)/TotalExpenses/page.js';


function Dashboard() {
  const [balance, setBalance] = useState('');
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingMaxExpense, setIsEditingMaxExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const user = searchParams.get('username');
    if (user) {
      setUsername(user);
      fetchUserExpenses(user);
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  const fetchUserExpenses = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging line

      if (data && data.expenses) {
        setExpenses(data.expenses);
      } else {
        console.error('No expenses found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleMaxExpenseChange = (e) => {
    setMaxMonthlyExpense(e.target.value);
  };

  const toggleBalanceEdit = () => {
    setIsEditingBalance(!isEditingBalance);
  };

  const toggleMaxExpenseEdit = () => {
    setIsEditingMaxExpense(!isEditingMaxExpense);
  };

  return (
    <div>
      <h2>Expense Management Dashboard</h2>

      <div>
        <h3>Balance:</h3>
        {isEditingBalance ? (
          <>
            <input
              type="number"
              value={balance}
              onChange={handleBalanceChange}
              placeholder="Enter new balance"
            />
            <button onClick={toggleBalanceEdit}>Save</button>
          </>
        ) : (
          <div>
            LKR: {balance}<br />
            <button onClick={toggleBalanceEdit}>Change Balance</button>
          </div>
        )}
      </div>

      <div>
        <h3>Max Monthly Expense:</h3>
        {isEditingMaxExpense ? (
          <>
            <input
              type="number"
              value={maxMonthlyExpense}
              onChange={handleMaxExpenseChange}
              placeholder="Enter max monthly expense"
            />
            <button onClick={toggleMaxExpenseEdit}>Save</button>
          </>
        ) : (
          <div>
            LKR: {maxMonthlyExpense}<br />
            <button onClick={toggleMaxExpenseEdit}>Change Max Monthly Expense</button>
          </div>
        )}
      </div>
      <TotalExpenses username={username} />
      <AddExpense username={username} setExpenses={setExpenses} />
      <ExpensesStructure username={username} expenses={expenses} />
      <DailyExpenses username={username} />
      
      
    </div>
  );
}

export default Dashboard;

*/


/*****"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddExpense from './(components)/AddExpense/page.js';
import ExpensesStructure from './(components)/ExpensesStructure/page.js';
import DailyExpenses from './(components)/DailyExpenses/page.js';
import TotalExpenses from './(components)/TotalExpenses/page.js';

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingMaxExpense, setIsEditingMaxExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const user = searchParams.get('username');
    if (user) {
      setUsername(user);
      fetchUserExpenses(user);
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  const fetchUserExpenses = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data && data.expenses) {
        setExpenses(data.expenses);
      } else {
        console.error('No expenses found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleMaxExpenseChange = (e) => {
    setMaxMonthlyExpense(e.target.value);
  };

  const toggleBalanceEdit = () => {
    setIsEditingBalance(!isEditingBalance);
  };

  const toggleMaxExpenseEdit = () => {
    setIsEditingMaxExpense(!isEditingMaxExpense);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Expense Management Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {// Balance Section }
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Balance:</h3>
          {isEditingBalance ? (
            <>
              <input
                type="number"
                value={balance}
                onChange={handleBalanceChange}
                placeholder="Enter new balance"
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={toggleBalanceEdit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <span className="text-gray-700 block mb-2">LKR: {balance}</span>
              <button
                onClick={toggleBalanceEdit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Change Balance
              </button>
            </div>
          )}
        </div>

        {//Max Monthly Expense Section }
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Max Monthly Expense:</h3>
          {isEditingMaxExpense ? (
            <>
              <input
                type="number"
                value={maxMonthlyExpense}
                onChange={handleMaxExpenseChange}
                placeholder="Enter max monthly expense"
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={toggleMaxExpenseEdit}
                className="w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <span className="text-gray-700 block mb-2">LKR: {maxMonthlyExpense}</span>
              <button
                onClick={toggleMaxExpenseEdit}
                className="w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                Change Max Monthly Expense
              </button>
            </div>
          )}
        </div>

        {// Total Expenses Section }
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-3">
          <TotalExpenses username={username} />
        </div>

        {// Add Expense Section }
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-2">
          <AddExpense username={username} setExpenses={setExpenses} />
        </div>

        {// Expenses Structure Section }
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-3">
          <ExpensesStructure username={username} expenses={expenses} />
        </div>

        {// Daily Expenses Section }
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-2">
          <DailyExpenses username={username} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;*/

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddExpense from './(components)/AddExpense/page.js';
import ExpensesStructure from './(components)/ExpensesStructure/page.js';
import DailyExpenses from './(components)/DailyExpenses/page.js';
import TotalExpenses from './(components)/TotalExpenses/page.js';

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingMaxExpense, setIsEditingMaxExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const user = searchParams.get('username');
    if (user) {
      setUsername(user);
      fetchUserExpenses(user);
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  const fetchUserExpenses = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data && data.expenses) {
        setExpenses(data.expenses);
      } else {
        console.error('No expenses found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleMaxExpenseChange = (e) => {
    setMaxMonthlyExpense(e.target.value);
  };

  const toggleBalanceEdit = () => {
    setIsEditingBalance(!isEditingBalance);
  };

  const toggleMaxExpenseEdit = () => {
    setIsEditingMaxExpense(!isEditingMaxExpense);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Expense Management Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Section */}
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Balance:</h3>
          {isEditingBalance ? (
            <>
              <input
                type="number"
                value={balance}
                onChange={handleBalanceChange}
                placeholder="Enter new balance"
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={toggleBalanceEdit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <span className="text-gray-700 block mb-2">LKR: {balance}</span>
              <button
                onClick={toggleBalanceEdit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Change Balance
              </button>
            </div>
          )}
        </div>

        {/* Max Monthly Expense Section */}
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Max Monthly Expense:</h3>
          {isEditingMaxExpense ? (
            <>
              <input
                type="number"
                value={maxMonthlyExpense}
                onChange={handleMaxExpenseChange}
                placeholder="Enter max monthly expense"
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={toggleMaxExpenseEdit}
                className="w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <span className="text-gray-700 block mb-2">LKR: {maxMonthlyExpense}</span>
              <button
                onClick={toggleMaxExpenseEdit}
                className="w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                Change Max Monthly Expense
              </button>
            </div>
          )}
        </div>

        {/* Total Expenses Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-3">
          <TotalExpenses username={username} />
        </div>

        {/* Add Expense Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-2">
          <AddExpense username={username} setExpenses={setExpenses} />
        </div>

        {/* Combined Expenses Structure and Daily Expenses Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Expenses Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expenses Structure (e.g., Pie Chart) */}
            <ExpensesStructure username={username} expenses={expenses} />
            {/* Daily Expenses (e.g., Line Chart) */}
            <DailyExpenses username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



