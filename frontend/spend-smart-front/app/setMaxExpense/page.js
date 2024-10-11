/*"use client";
import React, { useState } from 'react';

const SetMaxExpense = ({ username }) => {
  const [maxExpense, setMaxExpense] = useState(0);

  const handleSetMaxExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/expense/set-max-expense/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, maxMonthlyExpense: maxExpense }),
      });

      if (!response.ok) {
        throw new Error('Failed to set maximum expense');
      }

      const data = await response.json();
      console.log('Max expense set:', data);
      alert('Maximum monthly expense set successfully!');
    } catch (error) {
      console.error('Error setting maximum expense:', error);
    }
  };

  return (
    <div>
      <h3>Set Maximum Monthly Expense</h3>
      <form onSubmit={handleSetMaxExpense}>
        <input
          type="number"
          value={maxExpense}
          onChange={(e) => setMaxExpense(e.target.value)}
          required
          placeholder="Enter max expense amount"
        />
        <button type="submit">Set Max Expense</button>
      </form>
    </div>
  );
};

export default SetMaxExpense;*/



/*"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const SetMaxExpense = () => {
  const [maxExpense, setMaxExpense] = useState(0);
  const [username, setUsername] = useState(null); // Initialize username state
  const router = useRouter(); // Initialize useRouter

  // Use effect to set the username from the router query
  useEffect(() => {
    const { search } = window.location; // Get the search parameters from the URL
    const params = new URLSearchParams(search); // Create a URLSearchParams object
    const user = params.get('username'); // Get the username from the parameters

    if (user) {
      setUsername(user); // Set username if available
    }
  }, []);

  const handleSetMaxExpense = async (e) => {
    e.preventDefault();

    // Check if maxExpense is valid
    if (maxExpense <= 0) {
      alert('Please enter a valid maximum expense for the month.');
      return; // Exit if maxExpense is not valid
    }

    try {
      const response = await fetch(`http://localhost:8080/expense/set-max-expense/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, maxMonthlyExpense: maxExpense }),
      });

      if (!response.ok) {
        throw new Error('Failed to set maximum expense');
      }

      const data = await response.json();
      console.log('Max expense set:', data);
      alert('Maximum monthly expense set successfully!');
      
      // Navigate to the dashboard with the username
      router.push(`/dashboard?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error('Error setting maximum expense:', error);
    }
  };

  // Render loading state if username is not yet set
  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Set Maximum Monthly Expense</h3>
      <form onSubmit={handleSetMaxExpense}>
        <input
          type="number"
          value={maxExpense}
          onChange={(e) => setMaxExpense(e.target.value)}
          required
          placeholder="Enter max expense amount"
        />
        <button type="submit">Set Max Expense</button>
      </form>
    </div>
  );
};

export default SetMaxExpense;*/


"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SetMaxExpense = () => {
  const [maxExpense, setMaxExpense] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get username from query parameters
  useEffect(() => {
    const usernameFromQuery = searchParams.get('username');
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
  }, [searchParams]);

  const handleSetMaxExpense = async (e) => {
    e.preventDefault();
  
    // Validate maxExpense
    const parsedMaxExpense = parseFloat(maxExpense);
    if (isNaN(parsedMaxExpense) || parsedMaxExpense <= 0) {
      alert('Please enter a valid maximum expense for the month.');
      return;
    }
  
    try {
      // Prepare the request payload
      const payload = {
        username, // Ensure that username is included in the body
        maxMonthlyExpense: parsedMaxExpense,
      };
  
      // Make the POST request to the backend
      const response = await fetch(`http://localhost:8080/expense/set-max-expense/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to set maximum expense');
      }
  
      // Parse the response data
      const data = await response.json();
      console.log('Max expense set:', data);
      alert('Maximum monthly expense set successfully!');
  
      // Navigate to the dashboard with the username as a query parameter
      router.push(`/dashboard?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error('Error setting maximum expense:', error);
      alert(`Failed to set maximum expense: ${error.message}`);
    }
  };
  
  return (
    <div>
      <h3>Set Maximum Monthly Expense</h3>
      <form onSubmit={handleSetMaxExpense}>
        <input
          type="number"
          value={maxExpense}
          onChange={(e) => setMaxExpense(e.target.value)}
          required
          placeholder="Enter max expense amount"
        />
        <button type="submit">Set Max Expense</button>
      </form>
    </div>
  );
};

export default SetMaxExpense;
