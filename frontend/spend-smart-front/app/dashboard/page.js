/*"use client"
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register elements for chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingMaxExpense, setIsEditingMaxExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleMaxExpenseChange = (e) => {
    setMaxMonthlyExpense(e.target.value);
  };

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
            username: 'yourUsername', // Replace with the current username
            newExpenses: [newExpense],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        // Update the local state with the new expense
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const toggleBalanceEdit = () => {
    setIsEditingBalance(!isEditingBalance);
  };

  const toggleMaxExpenseEdit = () => {
    setIsEditingMaxExpense(!isEditingMaxExpense);
  };

  // Prepare data for the pie chart
  const data = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
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
            LKR: {balance}<br/>
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
            LKR: {maxMonthlyExpense}<br/>
            <button onClick={toggleMaxExpenseEdit}>Change Max Monthly Expense</button>
          </div>
        )}
      </div>

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

      <div>
        <h3>Expenses Structure (Last 30 Days):</h3>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Dashboard;*/
/*"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register elements for chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingMaxExpense, setIsEditingMaxExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [username, setUsername] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Extract the username from the query parameter
    const user = searchParams.get('username');
    if (user) {
      setUsername(user);
    } else {
      // Redirect to login if username is missing
      router.push('/login');
    }
  }, [searchParams, router]);

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleMaxExpenseChange = (e) => {
    setMaxMonthlyExpense(e.target.value);
  };

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

        // Update the local state with the new expense
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const toggleBalanceEdit = () => {
    setIsEditingBalance(!isEditingBalance);
  };

  const toggleMaxExpenseEdit = () => {
    setIsEditingMaxExpense(!isEditingMaxExpense);
  };

  // Prepare data for the pie chart
  const data = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
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

      <div>
        <h3>Expenses Structure (Last 30 Days):</h3>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Dashboard;*/

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddExpense from './(components)/AddExpense/page.js';  // Import the AddExpense component
import ExpensesStructure from './(components)/ExpensesStructure/page.js';  // Import the ExpensesStructure component

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
      const response = await fetch(`http://localhost:8080/expense/getUserExpense?username=${username}`);
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

      <AddExpense username={username} setExpenses={setExpenses} /> {/* Use the AddExpense component */}
      
      <ExpensesStructure expenses={expenses} /> {/* Use the ExpensesStructure component */}
    </div>
  );
}

export default Dashboard;
