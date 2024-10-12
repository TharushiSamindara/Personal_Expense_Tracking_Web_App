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
                    <h3 className="text-lg font-semibold mb-2">Balance</h3>
                    <span className="font-semibold">LKR : {balance}</span>
                </p>
            )}
        </div>
    );
};

export default DisplayBalance;
