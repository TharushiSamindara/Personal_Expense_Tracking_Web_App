// components/DisplayBalance.js
/*import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayBalance = ({ username }) => {
    const [balance, setBalance] = useState(null);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`/api/expenses/get-balance/${username}`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Current Balance</h2>
            {balance !== null ? (
                <p>Your current balance is: LKR {balance}</p>
            ) : (
                <p>Loading balance...</p>
            )}
        </div>
    );
};

export default DisplayBalance;*/

// components/DisplayBalance.js
/*import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayBalance = ({ username }) => {
    const [balance, setBalance] = useState(null);
    const [maxMonthlyExpense, setMaxMonthlyExpense] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/expense/get-balance/${username}`);
            setBalance(response.data.balance);
            setMaxMonthlyExpense(response.data.maxMonthlyExpense);
            setTotalExpenses(response.data.totalExpenses);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError('Error fetching balance. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div className="p-4 bg-white shadow-md rounded">
            {loading ? (
                <p className="text-lg text-gray-500">Loading balance...</p>
            ) : error ? (
                <p className="text-lg text-red-600">{error}</p>
            ) : (
                <div>
                    <p className="text-lg">
                        Your current balance is: <span className="font-semibold text-green-600">LKR {balance}</span>
                    </p>
                    <p className="text-lg">
                        Max Monthly Expense: <span className="font-semibold text-blue-600">LKR {maxMonthlyExpense}</span>
                    </p>
                    <p className="text-lg">
                        Total Expenses: <span className="font-semibold text-red-600">LKR {totalExpenses}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DisplayBalance;*/

import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayBalance = ({ username }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        try {
            console.log(`Fetching balance for user: ${username}`); // Debug log
            const response = await axios.get(`http://localhost:8080/expense/get-balance/${username}`);
            console.log('API Response:', response.data); // Log the response

            // Since your backend now only returns the balance, directly set the balance
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError('Error fetching balance. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (username) {
            console.log('Username prop:', username); // Debug log
            fetchBalance();
        }
    }, [username]);

    return (
        <div className="p-4 bg-white shadow-md rounded">
            {loading ? (
                <p className="text-lg text-gray-500">Loading balance...</p>
            ) : error ? (
                <p className="text-lg text-red-600">{error}</p>
            ) : (
                <p className="text-lg">
                    Your current balance is: <span className="font-semibold text-green-600">LKR {balance}</span>
                </p>
            )}
        </div>
    );
};

export default DisplayBalance;
