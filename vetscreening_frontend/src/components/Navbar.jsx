import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ currentPage }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get('http://worldtimeapi.org/api/ip')
            .then(response => {
                const date = new Date(response.data.datetime);
                setCurrentTime(date.toLocaleString());
            })
            .catch(error => {
                console.error('Error fetching time: ', error);
            });
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`)
                .then(response => {
                    const location = response.data[0];

                    return axios.get(`https://www.metaweather.com/api/location/${location.woeid}/`);
                })
                .then(response => {
                    const todayWeather = response.data.consolidated_weather[0];
                    setWeather({
                        temp: todayWeather.the_temp,
                        state: todayWeather.weather_state_name
                    });
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
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

                {weather && (
                    <li>Weather: {weather.temp.toFixed(2)}°C, {weather.state}</li>
                )}

                {/* Your existing navbar items here */}

            </ul>
        </nav>
    );
};

export default Navbar;
