"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'; // Updated to use search parameters
import Link from 'next/link';

const ChangeMaxMonthlyExpense = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username'); // Get username from the URL search parameters
    const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
    const [displayMaxMonthlyExpense, setDisplayMaxMonthlyExpense] = useState(0);

    useEffect(() => {
        const fetchMaxMonthlyExpense = async () => {
            if (!username) return; // Do nothing if username is not available
            try {
                const response = await axios.get(`http://localhost:8080/expense/get-max-monthly-expense?username=${username}`);
                if (response.data && response.data.maxMonthlyExpense) {
                    setDisplayMaxMonthlyExpense(response.data.maxMonthlyExpense);
                } else {
                    setDisplayMaxMonthlyExpense(0); // Default to 0 if no expense is set
                }
            } catch (error) {
                console.error('Error fetching max monthly expense:', error);
                setDisplayMaxMonthlyExpense(0); // Default to 0 in case of an error
            }
        };

        fetchMaxMonthlyExpense();
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!maxMonthlyExpense || isNaN(maxMonthlyExpense) || parseFloat(maxMonthlyExpense) < 0) {
            alert('Please enter a valid maximum monthly expense.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/expense/set-max-monthly-expense', {
                username,
                maxMonthlyExpense: parseFloat(maxMonthlyExpense),
            });
            alert('Maximum monthly expense updated successfully!');
            // Optionally navigate back to the dashboard or another page
            window.location.href = `/dashboard?username=${encodeURIComponent(username)}`; // Replace with your actual dashboard route
        } catch (error) {
            console.error('Error setting max monthly expense:', error);
            alert('Failed to set maximum monthly expense.');
        }
    };

    if (!username) return null; // Prevent rendering until username is available

    return (

        
        <div className="p-4 bg-white shadow-md rounded">

            {/* Navigation Bar */}
      <nav className="bg-[#6495ED] p-4 rounded shadow-md mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-red-500">S</span>pend
            <span className="text-red-500">S</span>mart
          </Link>
          <div className="flex space-x-4">
            <Link href={`/dashboard?username=${username}`} className="text-white hover:text-gray-300">Dashboard</Link>
            <Link href={`/add-expense?username=${username}`} className="text-white hover:text-gray-300">Add Expense</Link>
            <Link href={`/expense-filter?username=${username}`} className="text-white hover:text-gray-300">Filter Expense</Link>
            <Link href={`/update-expense?username=${username}`} className="text-white hover:text-gray-300">Update Expense</Link>
            <Link href={`/remove-expense?username=${username}`} className="text-white hover:text-gray-300">Delete Expense</Link>
            <Link href={`/`} className="text-white hover:text-gray-300">Logout</Link>
          </div>
        </div>
      </nav>
      
            <h3 className="text-lg font-semibold mb-2">Change Max Monthly Expense</h3>
            <span className="font-semibold">Current Max: LKR : {displayMaxMonthlyExpense}</span>
            <form onSubmit={handleSubmit} className="flex flex-col mt-2">
                <input
                    type="number"
                    value={maxMonthlyExpense}
                    onChange={(e) => setMaxMonthlyExpense(e.target.value)}
                    placeholder="Enter new maximum monthly expense"
                    required
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Max Expense</button>
            </form>
        </div>
    );
};

export default ChangeMaxMonthlyExpense;
