"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './AddExpensePage.module.css';

function AddExpensePage() {
  const [username, setUsername] = useState('');
  const [newExpenses, setNewExpenses] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/expense/add', {
        username,
        newExpenses,
      });

      console.log('Expense added successfully:', response.data);
      alert('Expense added successfully!');
      router.push('/dashboard'); // Redirect to dashboard after successful addition
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
      alert('Failed to add expense');
    }
  };

  return (
    <div className={styles['add-expense-page']}>
      <h2 className={styles.title}>Add Expense</h2>
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
        <div>
          <label className={styles.label} htmlFor="new-expenses">New Expenses:</label>
          <input
            className={styles.input}
            type="text"
            id="new-expenses"
            value={newExpenses}
            onChange={(e) => setNewExpenses(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpensePage;
