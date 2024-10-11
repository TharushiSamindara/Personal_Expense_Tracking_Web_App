"use client";

import React, { useState, useEffect } from 'react';

function TotalMonthlyExpenses({ username }) {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotalMonthlyExpenses = async () => {
      console.log('Fetching total monthly expenses for user:', username); // Debug log
      try {
        const response = await fetch(`http://localhost:8080/expense/total-monthly?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch total monthly expenses');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        setTotalExpenses(data.totalAmount); // Update to match your API response
        setError(''); // Clear any previous error
      } catch (error) {
        console.error('Error fetching total monthly expenses:', error);
        setError('Error fetching total monthly expenses');
      }
    };

    if (username) {
      fetchTotalMonthlyExpenses();
    }
  }, [username]); // Dependency array ensures the effect runs when the username changes

  return (
    <div className="bg-white shadow-md p-4 rounded">
      {error && <p className="text-red-500">{error}</p>}
      <p className="font-semibold">Total Expenses: LKR {totalExpenses}</p>
    </div>
  );
}

export default TotalMonthlyExpenses;

