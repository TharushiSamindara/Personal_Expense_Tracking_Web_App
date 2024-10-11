"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddExpense from './(components)/AddExpense/page.js';
import ExpensesStructure from './(components)/ExpensesStructure/page.js';
import DailyExpenses from './(components)/DailyExpenses/page.js';
import RemoveExpense from './(components)/RemoveExpense/page.js';
import UpdateExpense from './(components)/UpdateExpense/page.js';
import TotalMonthlyExpenses from './(components)/TotalMonthlyExpenses/page.js';
import SetMaxMonthlyExpense from './(components)/SetMaxMonthlyExpense/page.js';
import DisplayBalance from './(components)/DisplayBalance/page.js';
import ExpenseFilter from './(components)/ExpenseFilter/page.js';
import WineDisplay from './(components)/WineDisplay/page.js';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const user = searchParams.get('username');
    if (user) {
      setUsername(user);
      fetchUserExpenses(user);
      fetchUserBalance(user);
      fetchMaxMonthlyExpense(user);
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  const fetchUserExpenses = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
      const data = await response.json();
      if (data && data.expenses) {
        setExpenses(data.expenses);
      } else {
        console.error('No expenses found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchUserBalance = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/get-balance/${username}`);
      const data = await response.json();
      if (data && data.balance !== undefined) {
        setBalance(data.balance);
      } else {
        console.error('No balance found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchMaxMonthlyExpense = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/get-max-monthly-expense?username=${username}`);
      const data = await response.json();
      if (data && data.maxMonthlyExpense !== undefined) {
        setMaxMonthlyExpense(data.maxMonthlyExpense);
      } else {
        console.error('No max monthly expense found in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching max monthly expense:', error);
    }
  };

  // Check the conditions for the warning message when balance or maxMonthlyExpense updates
  useEffect(() => {
    if (maxMonthlyExpense === 0) {
      setWarningMessage('Please set your maximum monthly expense.');
    } else if (balance <= maxMonthlyExpense * 0.1) {
      setWarningMessage('Warning: Your balance is low (<= 10% of your maximum monthly expense).');
    } else {
      setWarningMessage(''); // Clear the warning message if conditions are not met
    }
  }, [balance, maxMonthlyExpense]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Expense Management Dashboard</h2>

      <div className="flex justify-center" style={{ marginLeft: '96px', marginRight: '96px' }}>
      <WineDisplay />
      </div> 
      <br/>

      {/* Show Warning Message */}
      {warningMessage && (
        <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4 mb-6 rounded">
          {warningMessage}
        </div>
      )}

      <div className="flex justify-between mb-6">
        <div className="bg-white shadow-md p-4 rounded w-full lg:w-1/4 mr-2">
          <h3 className="text-lg font-semibold mb-2">Total Monthly Expense</h3>
          <TotalMonthlyExpenses username={username} />
        </div>
        <div className="bg-white shadow-md p-4 rounded w-full lg:w-1/4 mx-2">
          <h3 className="text-lg font-semibold mb-2">Set Max Monthly Expense</h3>
          <SetMaxMonthlyExpense username={username} />
        </div>
        <div className="bg-white shadow-md p-4 rounded w-full lg:w-1/4 ml-2">
          <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
          <DisplayBalance username={username} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Expense Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-2">
          <AddExpense username={username} setExpenses={setExpenses} />
        </div>

        {/* Update Expense Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-1">
          <UpdateExpense username={username} setExpenses={setExpenses} />
        </div>

        {/* Remove Expense Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-1">
          <RemoveExpense username={username} setExpenses={setExpenses} />
        </div>

        <ExpenseFilter username={username} setExpenses={setExpenses} />

        {/* Expenses Overview Section */}
        <div className="bg-white shadow-md p-4 rounded col-span-1 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Expenses Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpensesStructure username={username} expenses={expenses} />
            <DailyExpenses username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
