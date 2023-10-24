import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Assuming axiosInstance.js is the file containing your Axios instance setup

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Retrieve the token from local storage
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                };

                console.log('Logging out...'); // Add console log

                const response = await axiosInstance.post('/users/logout/', {}, config);

                if (response.status === 200) {
                    // Clear your token from local storage
                    localStorage.removeItem('token');
                    console.log('Logout successful'); // Add console log
                    navigate('/login');
                } else {
                    console.log('Logout failed. Response:', response); // Add console log for debugging
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return null; // or you could return a spinner or some loading indicator
};

export default Logout;
