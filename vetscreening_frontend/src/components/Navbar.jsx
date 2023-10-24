import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ currentPage }) => {
  const [currentTime, setCurrentTime] = useState('');

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

        {currentPage === 'dashboard' ? (
          <li>Powered by Echo Platoon</li>
        ) : (
          <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
        )}

        {currentPage === 'register' && <li><Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link></li>}
        {currentPage === 'login' && <li><Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link></li>}
        {currentPage === 'questionnaire' && <li><Link to="/questionnaire" style={{ color: '#fff', textDecoration: 'none' }}>Questionnaire</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
