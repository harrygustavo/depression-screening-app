import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Initialize error message state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', formData, { withCredentials: true });

            // Save token to local storage
            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log('Login successful', response.data);
            navigate('/dashboard'); // Navigate to the dashboard upon successful login
        } catch (error) {
            console.error('Login error', error);
            if (error.response) {
                console.error('Error response', error.response.data);
                // Handle different error cases
                if (error.response.status === 401) {
                    // Unauthorized - User does not exist or incorrect password
                    setErrorMessage('Sorry! It is possible that this user does not exist or the password is incorrect.');
                } else {
                    // Other errors (handle as needed)
                    setErrorMessage('Sorry! It is possible that this user does not exist or the password is incorrect.');
                }
            }
        }
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
        }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
            }}>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Username" 
                    required 
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                    }}
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                    }}
                />
                <button type="submit" style={{
                    background: '#B22234',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}>
                    Login
                </button>
            </form>
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {errorMessage}
                </div>
            )}
            <div style={{ marginTop: '20px' }}>
                Don't have an account?
                <Link to="/register" style={{
                    color: '#fff',
                    marginLeft: '5px',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                }}>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
