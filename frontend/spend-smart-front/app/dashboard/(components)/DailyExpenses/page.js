"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MonthlyExpensesGraph = ({ username }) => {
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expense/monthly-expenses?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch monthly expenses');
        }
        const data = await response.json();
        console.log('Fetched daily expenses:', data); // Log the fetched data for debugging
        setDailyExpenses(data);
      } catch (error) {
        console.error('Error fetching monthly expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchMonthlyExpenses();
    }
  }, [username]);

  // Prepare data for the line chart
  const labels = dailyExpenses.map(expense => expense.date); // Use the actual dates as labels for the X-axis
  const dataPoints = dailyExpenses.map(expense => expense.totalAmount); // Use total amounts for the Y-axis

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Expenses (LKR)',
        data: dataPoints,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1, // Smooths the line
        pointRadius: 4, // Size of the points on the line
        pointHoverRadius: 6, // Size of the points on hover
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Amount (LKR)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `LKR ${context.parsed.y.toLocaleString()}`, // Format tooltip values
        },
      },
    },
  };

  return (
    <div>
      <h3>Daily Expenses for {new Date().toLocaleString('default', { month: 'long' })}:</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default MonthlyExpensesGraph;
