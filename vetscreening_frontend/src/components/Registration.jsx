import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [zip, setZip] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        axios.post('http://localhost:8000/api/users/register/', {
            username: username,
            zip_code: zip,
            password: password,
        })
        .then((response) => {
            alert('Registration successful! Redirecting to login.');
            navigate('/login');
        })
        .catch((error) => {
            if (error.response) {
                // The server responded with an error status
                if (error.response.status === 400) {
                    // Handle specific server error messages
                    const errorData = error.response.data;
                    if (errorData.error) {
                        alert(errorData.error); // Display the specific error message from the server
                    } else {
                        // Handle other validation errors
                        if (errorData.username) {
                            alert('Username: ' + errorData.username.join(', '));
                        }
                        if (errorData.zip_code) {
                            alert('Zip Code: ' + errorData.zip_code.join(', '));
                        }
                        if (errorData.password) {
                            alert('Password: ' + errorData.password.join(', '));
                        }
                    }
                } else {
                    // Handle other server errors
                    alert('Registration failed. Please try again.');
                }
            } else {
                // Handle network or other errors
                alert('Registration failed. Please try again.');
            }
        });
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
            <h1>Registration</h1>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
            }}>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Username" 
                  required 
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
                <input 
                  type="text" 
                  value={zip} 
                  onChange={(e) => setZip(e.target.value)} 
                  placeholder="Zip Code" 
                  required 
                  pattern="\d{5}" 
                  title="Enter a valid 5-digit zip code"
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  required 
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm Password" 
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
                  Register
                </button>
            </form>
            <div style={{marginTop: '20px'}}>
              Already have an account? 
              <Link to="/login" style={{
                color: '#fff',
                marginLeft: '5px',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>
                Login
              </Link>
            </div>
        </div>
    );
};

export default Registration;
