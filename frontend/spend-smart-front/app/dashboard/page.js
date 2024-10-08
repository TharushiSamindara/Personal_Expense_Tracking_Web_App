import React from 'react';

function Dashboard() {
  const handleAddExpense = () => {
    // Logic to handle adding expenses
    console.log('Add Expense');
  };

  const handleReadExpenses = () => {
    // Logic to handle reading expenses
    console.log('Read Expenses');
  };

  const handleUpdateExpense = () => {
    // Logic to handle updating expenses
    console.log('Update Expense');
  };

  const handleRemoveExpense = () => {
    // Logic to handle removing expenses
    console.log('Remove Expense');
  };

  return (
    <div>
      <h2>Expense Management Dashboard</h2>
      <div>
        <button /*onClick={handleAddExpense}*/>Add Expense</button>
        <button /*onClick={handleReadExpenses}*/>Read Expenses</button>
        <button /*onClick={handleUpdateExpense}*/>Update Expense</button>
        <button /*onClick={handleRemoveExpense}*/>Remove Expense</button>
      </div>
    </div>
  );
}

export default Dashboard;
