import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Dashboard = () => {
    const [phq9History, setPHQ9History] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check user authentication when the component mounts
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Fetch the user's PHQ-9 history when authenticated
            fetchPHQ9History(token);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const fetchPHQ9History = async (token) => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/phq9/list/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                setPHQ9History(response.data);
            }
        } catch (error) {
            console.error('Error fetching PHQ-9 history:', error);
        }
    };

    const getScreeningResult = (totalScore) => {
        if (totalScore < 10) {
            return 'Negative';
        } else {
            return 'Positive';
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return format(date, "MMMM d, yyyy 'at' h:mmaaa", options);
    };

    const getScoreStyle = (totalScore) => {
        return totalScore < 10 ? {} : { color: 'red' };
    };

    return (
        <div style={{
            backgroundColor: '#002366',
            height: '100vh',
            width: '100vw',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <h1>Welcome to Your Dashboard</h1>
            <h4 style={{
                textAlign: 'center',
                maxWidth: '600px',
                margin: '20px auto',
            }}>
               See all of your screening results over time 
            </h4>
            
            {isAuthenticated && phq9History.length > 0 ? (
                <div>
                    <h2>Your PHQ-9 History</h2>
                    <ul style={{
                        listStyleType: 'none',
                        padding: 0,
                    }}>
                        {phq9History.map((result) => (
                            <li key={result.id} style={{
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}>
                                On {formatDate(result.timestamp)}, your score was{' '}
                                <span style={getScoreStyle(result.total_score)}>
                                    {getScreeningResult(result.total_score)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Once you take a depression screening, your history will be displayed here.</p>
            )}

            <div style={{ marginTop: '20px' }}>
                <Link to="/logout" style={{
                    backgroundColor: '#B22234',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginRight: '15px',
                }}>
                    Logout
                </Link>

                <Link to="/questionnaire" style={{
                    backgroundColor: '#B22234',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                }}>
                    Go to Questionnaire
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;