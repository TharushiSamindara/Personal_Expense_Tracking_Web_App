// ChangeMaxMonthlyExpense.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const ChangeMaxMonthlyExpense = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const router = useRouter();
    //const { username } = router.query; // Get username from the query parameters
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
        try {
            const response = await axios.post('http://localhost:8080/expense/set-max-monthly-expense', {
                username,
                maxMonthlyExpense: parseFloat(maxMonthlyExpense),
            });
            alert('Maximum monthly expense updated successfully!');
            // Optionally navigate back to the dashboard or another page
            router.push('/dashboard'); // Replace with your actual dashboard route
        } catch (error) {
            console.error('Error setting max monthly expense:', error);
            alert('Failed to set maximum monthly expense.');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
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
