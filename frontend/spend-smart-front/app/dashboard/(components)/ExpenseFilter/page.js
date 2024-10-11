/*import React, { useState } from 'react';
import axios from 'axios';

function ExpenseFilter({ username }) {
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/filter', {
        params: {
          username,
          date: filterByDate ? date : undefined,
          name: filterByName ? name : undefined,
        },
      });
      setFilteredData(response.data); // Store filtered data in state
    } catch (error) {
      console.error('Error filtering expenses:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter Expenses</h2>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByDate}
            onChange={() => setFilterByDate(!filterByDate)}
          />
          Filter by Date
        </label>
        {filterByDate && (
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
      </div>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByName}
            onChange={() => setFilterByName(!filterByName)}
          />
          Filter by Name (Category)
        </label>
        {filterByName && (
          <input
            type="text"
            placeholder="Enter category name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>
      
      <button 
        onClick={handleFilter} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Filter
      </button>

      
      {filteredData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Filtered Expenses:</h3>
          <ul className="list-disc pl-5">
            {filteredData.map((expense, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{expense.name}</span>: {expense.amount} on {expense.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExpenseFilter;*/

import React, { useState } from 'react';
import axios from 'axios';

function ExpenseFilter({ username }) {
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8080/expense/filter', {
        params: {
          username,
          date: filterByDate ? date : undefined,
          name: filterByName ? name : undefined,
        },
      });
      setFilteredData(response.data); // Store filtered data in state
    } catch (error) {
      console.error('Error filtering expenses:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter Expenses</h2>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByDate}
            onChange={() => setFilterByDate(!filterByDate)}
          />
          Filter by Date
        </label>
        {filterByDate && (
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
      </div>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filterByName}
            onChange={() => setFilterByName(!filterByName)}
          />
          Filter by Name (Category)
        </label>
        {filterByName && (
          <input
            type="text"
            placeholder="Enter category name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>
      
      <button 
        onClick={handleFilter} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Filter
      </button>

      {/* Display filtered data in a table */}
      {filteredData.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Filtered Expenses:</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{expense.name}</td>
                  <td className="py-2 px-4 border-b">{expense.amount}</td>
                  <td className="py-2 px-4 border-b">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseFilter;

