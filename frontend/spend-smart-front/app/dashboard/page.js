
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
/*getUserExpense*/
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

/**/
