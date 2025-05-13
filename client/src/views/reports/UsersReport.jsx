import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const url = import.meta.env.VITE_API_URL;

function UsersReport() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track error state

    const getUserReport = async () => {
        setLoading(true); // Set loading to true when request starts
        setError(null); // Clear any previous errors
        try {
            const res = await axios.get(`${url}/api/reports/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': auth.token || ''
                },
                responseType: 'arraybuffer',
                withCredentials: true
            });

            // Call the download function when you have the response
            downloadFile(res.data, 'users_report.xlsx');
        } catch (error) {
            setError('Failed to fetch the report. Please try again later.');
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    const downloadFile = (data, filename) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>Users Report</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if there's an issue */}
            <button onClick={getUserReport} disabled={loading}>
                {loading ? 'Loading...' : 'Get Report'}
            </button>
        </div>
    );
}

export default UsersReport;
