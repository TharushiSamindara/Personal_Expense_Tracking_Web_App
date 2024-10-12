/*"use client"; // Ensure this is at the top if using Next.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesStructure = ({ username }) => {
  const [expenses, setExpenses] = useState([]); // State to store expenses

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        console.log('Fetched expenses:', data); // Log the fetched data
        setExpenses(data); // Set the expenses state to the entire response array
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [username]);

  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Sum expenses by name for the current month
  const expenseSums = expenses && Array.isArray(expenses)
    ? expenses.reduce((acc, user) => {
        if (Array.isArray(user.newExpenses)) {
          user.newExpenses.forEach((expense) => {
            const expenseDate = new Date(expense.date);
            if (
              expenseDate.getMonth() === currentMonth &&
              expenseDate.getFullYear() === currentYear
            ) {
              const { name, amount } = expense;
              acc[name] = (acc[name] || 0) + amount; // Sum expenses by name
            }
          });
        }
        return acc;
      }, {})
    : {};

  // Prepare data for the pie chart
  const data = {
    labels: Object.keys(expenseSums), // Names of the expenses
    datasets: [
      {
        data: Object.values(expenseSums), // Total amounts for each expense name
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
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses Structure (This Month)</h3>
      {Object.keys(expenseSums).length === 0 ? (
        <div className="text-gray-500">No expenses available for this month.</div>
      ) : (
        <div className="w-full md:w-2/3 mx-auto">
          <Pie data={data} />
        </div>
      )}
    </div>
  );
};

export default ExpensesStructure;*/

"use client"; // Ensure this is at the top if using Next.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

// Register elements for Chart.js
ChartJS.register(ArcElement, Tooltip);

const ExpensesStructure = ({ username }) => {
  const [expenses, setExpenses] = useState([]); // State to store expenses

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expense/user-expenses?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        console.log('Fetched expenses:', data); // Log the fetched data
        setExpenses(data); // Set the expenses state to the entire response array
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [username]);

  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Sum expenses by name for the current month
  const expenseSums = expenses && Array.isArray(expenses)
    ? expenses.reduce((acc, user) => {
        if (Array.isArray(user.newExpenses)) {
          user.newExpenses.forEach((expense) => {
            const expenseDate = new Date(expense.date);
            if (
              expenseDate.getMonth() === currentMonth &&
              expenseDate.getFullYear() === currentYear
            ) {
              const { name, amount } = expense;
              acc[name] = (acc[name] || 0) + amount; // Sum expenses by name
            }
          });
        }
        return acc;
      }, {})
    : {};

  // Prepare data for the pie chart
  const labels = Object.keys(expenseSums); // Names of the expenses
  const data = {
    labels, 
    datasets: [
      {
        data: Object.values(expenseSums), // Total amounts for each expense name
        backgroundColor: labels.map((_, index) => {
          // Generate a set of colors for each label to ensure they have unique colors
          const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#FF8C94', '#A2B9BC', '#B39EB5', '#D8BFD8',
            '#FFB6C1', '#B0E0E6', '#ADD8E6', '#DEB887', '#8FBC8F',
          ];
          return colors[index % colors.length];
        }),
        hoverBackgroundColor: labels.map((_, index) => {
          // Match hover colors with background colors
          const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#FF8C94', '#A2B9BC', '#B39EB5', '#D8BFD8',
            '#FFB6C1', '#B0E0E6', '#ADD8E6', '#DEB887', '#8FBC8F',
          ];
          return colors[index % colors.length];
        }),
      },
    ],
  };

  // Options to remove the legend from the chart
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the default legend that appears above the chart
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses Structure (This Month)</h3>
      {labels.length === 0 ? (
        <div className="text-gray-500">No expenses available for this month.</div>
      ) : (
        <div className="flex flex-col md:flex-row items-center">
          {/* Display the labels on the left */}
          <div className="mb-4 md:mb-0 md:mr-6">
            <ul className="space-y-2">
              {labels.map((name, index) => (
                <li key={index} className="text-gray-700">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span className="ml-2">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Display the pie chart */}
          <div className="w-full md:w-2/3">
            <Pie data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesStructure;

