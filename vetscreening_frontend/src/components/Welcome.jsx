import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div style={{
      backgroundColor: '#002366', // Dark blue background
      height: '100vh',
      width: '100vw', // Ensuring the container takes up the full viewport width
      color: '#fff',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0, // Removing default margins
      padding: 0, // Removing default paddings
    }}>
      <h1>Welcome to the Depression Screening App for Veterans</h1>
      <p>Did you know that veterans have higher rates of depression?</p>
      
      <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <Link to="/register" style={{
          background: '#B22234', // Red color
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
          Want to try our screening? Please Register.
        </Link>
      </div>
      
      <div>
        Already a user?
        <Link to="/login" style={{
          color: '#fff',
          marginLeft: '5px',
          textDecoration: 'underline',
          fontWeight: 'bold',
        }}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
