/*import { useState, useEffect } from 'react';
import axios from 'axios';

const SetMaxMonthlyExpense = ({ username }) => {
    const [maxMonthlyExpense, setMaxMonthlyExpense] = useState('');
    const [displayMaxMonthlyExpense, setDisplayMaxMonthlyExpense] = useState(0);

    // Fetch the existing max monthly expense when the component mounts
    useEffect(() => {
        const fetchMaxMonthlyExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/expense/get-max-monthly-expense?username=${username}`);
                if (response.data && response.data.maxMonthlyExpense) {
                    setDisplayMaxMonthlyExpense(response.data.maxMonthlyExpense);
                } else {
                    setDisplayMaxMonthlyExpense(0); // Display 0 if no max monthly expense is set
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
        try {
            const response = await axios.post('http://localhost:8080/expense/set-max-monthly-expense', {
                username,
                maxMonthlyExpense: parseFloat(maxMonthlyExpense),
            });
            setDisplayMaxMonthlyExpense(parseFloat(maxMonthlyExpense));
        } catch (error) {
            console.error('Error setting max monthly expense:', error);
            alert('Failed to set maximum monthly expense.');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h3 className="text-lg font-semibold mb-2">Max Monthly Expense</h3>
            <span className="font-semibold">LKR : {displayMaxMonthlyExpense}</span>   
            <form onSubmit={handleSubmit} className="flex flex-col mt-2">
                <input
                    type="number"
                    value={maxMonthlyExpense}
                    onChange={(e) => setMaxMonthlyExpense(e.target.value)}
                    placeholder="Enter maximum monthly expense"
                    required
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Set Max Expense</button>
            </form>
        </div>
    );
};    

export default SetMaxMonthlyExpense;*/



"use client"; // Ensure this is a client component

import { useEffect, useState } from 'react';
import axios from 'axios';

const SetMaxMonthlyExpense = ({ username }) => {
    const [displayMaxMonthlyExpense, setDisplayMaxMonthlyExpense] = useState(0);

    useEffect(() => {
        if (!username) return; // Do not fetch until username is available

        const fetchMaxMonthlyExpense = async () => {
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

    const handleUpdateClick = () => {
        // Navigate to the Change Max Monthly Expense page
        window.location.href = `/dashboard/change-max-monthly-expense?username=${encodeURIComponent(username)}`;
    };

    if (!username) return null; // Prevent rendering until username is available

    return (
        
        <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
        <div>
            <h3 className="text-lg font-semibold">Max Monthly Expense</h3>
            <span className="font-semibold text-xl">LKR: {displayMaxMonthlyExpense}</span>
        </div>
        <button
            onClick={handleUpdateClick}
            className="flex items-center bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2" // Icon size and margin
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3h-2v7H5v2h6v7h2v-7h6v-2h-6z"
                />
            </svg>
            Update
        </button>
        </div>

    );
};

export default SetMaxMonthlyExpense;
