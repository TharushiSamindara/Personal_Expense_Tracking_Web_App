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
        console.log('Fetched daily expenses:', data);
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
  const labels = dailyExpenses.map(expense => expense.date);
  const dataPoints = dailyExpenses.map(expense => expense.totalAmount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Expenses (LKR)',
        data: dataPoints,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
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
          label: (context) => `LKR ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    maintainAspectRatio: false, // Allow the chart to resize based on its container
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Daily Expenses for {new Date().toLocaleString('default', { month: 'long' })}:
      </h3>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] h-96">
            <Line data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpensesGraph;

