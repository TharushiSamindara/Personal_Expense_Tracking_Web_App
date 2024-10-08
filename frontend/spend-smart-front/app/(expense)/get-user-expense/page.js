"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from './GetUserExpensePage.module.css'; // Ensure you have the appropriate CSS

function GetUserExpensePage() {
  const [username, setUsername] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:8080/expense/getUserExpense?username=${username}`);
      setExpenses(response.data.expenses);
      console.log('User expenses:', response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error.response?.data || error.message);
      setError('Failed to fetch expenses');
    }
  };

  return (
    <div className={styles['get-user-expense-page']}>
      <h2 className={styles.title}>Get User Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="username">Username:</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Get Expenses</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.expensesList}>
        <h3>Expenses:</h3>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.name} - ${expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </div>
  );
}

export default GetUserExpensePage;
