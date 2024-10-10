// components/TotalExpenses.js
"use client";
import React, { useEffect, useState } from 'react';

const TotalExpenses = ({ username }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expense/total-expenses/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch total expenses');
        }

        const data = await response.json();
        setTotalExpenses(data.total);
      } catch (error) {
        console.error('Error fetching total expenses:', error);
      }
    };

    if (username) {
      fetchTotalExpenses();
    }
  }, [username]);

  return (
    <div>
      <h3>Total Expenses by Now</h3>
      <p>LKR {totalExpenses}</p>
    </div>
  );
};

export default TotalExpenses;
