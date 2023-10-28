import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPage }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Fetching time
        axios.get('http://worldtimeapi.org/api/ip')
            .then(response => {
                const date = new Date(response.data.datetime);
                setCurrentTime(date.toLocaleString());
            })
            .catch(error => {
                console.error('Error fetching time:', error);
            });

        // Fetching weather
        axios.get('https://wttr.in/?format=%t+%C')
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
    }, []);

    return (
        <nav style={{
            backgroundColor: '#002366',
            color: '#fff',
            padding: '10px 20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <ul style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                listStyleType: 'none',
                margin: 0,
                padding: 0
            }}>
                <li>Today's date and time: {currentTime}</li>
                {weather && <li>Weather: {weather}</li>}

                {/* Your existing navbar items here */}
            </ul>
        </nav>
    );
};

export default Navbar;
