import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const base_url = import.meta.env.VITE_BASE_URL;
const weather_api_key = 'YOUR_OPENWEATHERMAP_API_KEY'; // Add your OpenWeatherMap API key here

const Dashboard = () => {
    // ... (other states here)
    const [weather, setWeather] = useState(null);

    // ... (other useEffects here)

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
            {/* ... (other parts of your JSX here) */}

            {renderWeather()}

            {/* ... (other parts of your JSX here) */}
        </div>
    );
};

export default Dashboard;
