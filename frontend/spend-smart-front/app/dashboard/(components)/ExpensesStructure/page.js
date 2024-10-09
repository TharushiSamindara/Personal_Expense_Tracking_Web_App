// ExpensesStructure.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register elements for chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesStructure = ({ expenses }) => {
  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter expenses for the current month
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Prepare data for the pie chart
  const data = {
    labels: currentMonthExpenses.map((expense) => expense.name),
    datasets: [
      {
        data: currentMonthExpenses.map((expense) => expense.amount),
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
      <h3>Expenses Structure (This Month):</h3>
      {expenses.length === 0 ? (
        <div>No expenses available for this month.</div>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
};

export default ExpensesStructure;
