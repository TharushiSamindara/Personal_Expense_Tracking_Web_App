import React, { useState } from 'react';
import axios from 'axios';

function ExpenseFilter({ username }) {  // Accept username as a prop
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/filter', {
        params: {
          username, // Use the username prop
          date: filterByDate ? date : undefined,
          name: filterByName ? name : undefined,
        },
      });
      console.log('Filtered Expenses:', response.data);
    } catch (error) {
      console.error('Error filtering expenses:', error);
    }
  };

  return (
    <div>
      <h2>Filter Expenses</h2>
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={filterByDate}
            onChange={() => setFilterByDate(!filterByDate)}
          />
          Filter by Date
        </label>
        {filterByDate && (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filterByName}
            onChange={() => setFilterByName(!filterByName)}
          />
          Filter by Name (Category)
        </label>
        {filterByName && (
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default ExpenseFilter;
