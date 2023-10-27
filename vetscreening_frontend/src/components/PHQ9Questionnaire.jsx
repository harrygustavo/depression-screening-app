import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = import.meta.env.VITE_BASE_URL

const PHQ9Questionnaire = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(new Array(9).fill(0));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check user authentication when the component mounts
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const questions = [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed, or hopeless",
        "Trouble falling or staying asleep, or sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
        "Trouble concentrating on things, such as reading the newspaper or watching television",
        "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
        "Thoughts that you would be better off dead or of hurting yourself in some way"
    ];

    const handleChange = (e, index) => {
        const value = parseInt(e.target.value);
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isAuthenticated) {
            console.error('User is not authenticated');
            // Redirect to the login page or handle authentication as needed
            navigate('/login');
            return;
        }

        // Create payload object
        const payload = {
            total_score: answers.reduce((a, b) => a + b, 0),
            question_9_score: answers[8], // get the score of the 9th question
            
        };

        // Get authentication token from localStorage
        const token = localStorage.getItem('token');

        // Send the JSON payload in the Axios request with the Authorization header
        try {
            const response = await axios.post(`http://${base_url}/api/users/phq9/create/`, payload, {
                headers: {
                    'Authorization': `Token ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json', // Specify JSON content type
                },
            });

            if (response.status === 201) {
                console.log('Data successfully sent to the backend');
                navigate('/results', { state: { totalScore: payload.total_score, answers } });
            }
        } catch (error) {
            console.error('An error occurred while sending the data to the backend:', error.response.data);
        }
    };

    return (
      <div style={{
          backgroundColor: '#002366',
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
          width: '100vw',
          padding: '150px',
          boxSizing: 'content-box',
      }}>
          <h1 style={{ marginBottom: '20px' }}>PHQ-9 Questionnaire</h1>
          <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              maxWidth: '500px',
          }}>
              {questions.map((question, index) => (
                  <div key={index} style={{ width: '100%' }}>
                      <p style={{ textAlign: 'justify' }}>{question}</p>
                      <select 
                          onChange={e => handleChange(e, index)} 
                          value={answers[index]} 
                          style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '5px',
                              border: 'none',
                          }}
                      >
                          <option value="0">Not at all</option>
                          <option value="1">Several days</option>
                          <option value="2">More than half the days</option>
                          <option value="3">Nearly every day</option>
                      </select>
                  </div>
              ))}
              <button type="submit" style={{
                  background: '#B22234',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: ' none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  width: '100%',
              }}>
                  Submit
              </button>
          </form>
      </div>
  );
};

export default PHQ9Questionnaire;