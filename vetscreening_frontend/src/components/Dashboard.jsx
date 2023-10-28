import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const base_url = import.meta.env.VITE_BASE_URL;
const weather_api_key = 'YOUR_OPENWEATHERMAP_API_KEY'; // Add your OpenWeatherMap API key here

const Dashboard = () => {
    const [phq9History, setPHQ9History] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchPHQ9History(token);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=imperial`);
                setWeather(weatherResponse.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        });
    }, []);

    const fetchPHQ9History = async (token) => {
        try {
            const response = await axios.get(`http://${base_url}/api/users/phq9/list/`, {
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
        return format(date, "MMMM d, yyyy 'at' h:mmaaa");
    };

    const getScoreStyle = (totalScore) => {
        return totalScore < 10 ? {} : { color: 'red' };
    };

    const renderWeather = () => {
        if (weather) {
            const temperature = weather.main.temp;
            const description = weather.weather[0].description;
            return (
                <div style={{ marginTop: '20px' }}>
                    <h4>Current Weather: {temperature}°F, {description}</h4>
                </div>
            );
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
            
            {renderWeather()}

            {/* Your existing JSX code here, including the lists, links, and other components */}
        </div>
    );
};

export default Dashboard;
