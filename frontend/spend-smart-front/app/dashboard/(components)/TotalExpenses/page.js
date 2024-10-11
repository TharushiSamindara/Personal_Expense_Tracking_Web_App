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

  // Format the totalExpenses with spaces as thousand separators
  const formattedExpenses = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0
  }).format(totalExpenses);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Total Expenses by Now</h3>
      <p className="text-2xl text-blue-600">LKR {formattedExpenses}</p>
    </div>
  );
};

export default TotalExpenses;

