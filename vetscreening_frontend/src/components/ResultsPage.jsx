import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosConfig';

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { totalScore, answers } = location.state;

    const [clinics, setClinics] = useState([]);
    const [apiFailed, setApiFailed] = useState(false);

    useEffect(() => {
        if (totalScore >= 10) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                axios.get(`/users/clinics/?latitude=${latitude}&longitude=${longitude}`)
                    .then(response => {
                        setClinics(response.data.results);
                    })
                    .catch(error => {
                        console.error("Error fetching clinic data:", error);
                        setApiFailed(true);
                    });
            });
        }
    }, [totalScore]);

    const renderMoreResourcesButton = () => (
        <button onClick={() => window.open("https://www.veteranscrisisline.net/find-resources/local-resources/", "_blank")} style={{
            background: '#002366',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '20px',
            marginBottom: '20px',
            width: '300px',
        }}>
            Find More Local Resources
        </button>
    );

    const renderClinics = () => {
        if (clinics.length > 0 || apiFailed) {
            return (
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#B22234'
                }}>
                    <h4 style={{ marginBottom: '10px' }}>Here you can find Veterans Affairs Clinics and VA Resources close to you:</h4>
                    <ul style={{
                        listStyleType: 'none',
                        padding: '0'
                    }}>
                        {clinics.map(clinic => (
                            <li key={clinic.place_id} style={{
                                marginBottom: '15px',
                                backgroundColor: '#fff',
                                color: '#000',
                                borderRadius: '5px',
                                padding: '10px'
                            }}>
                                <strong>{clinic.name}</strong>
                                <p style={{ margin: '5px 0 0' }}>{clinic.address}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    const renderResults = () => {
        if (totalScore < 10 && answers[8] === 0) {
            return <h3>Your depression screening result is negative. No further action is needed.</h3>;
        } else {
            return (
                <div>
                    {totalScore >= 10 && (
                        <div>
                            <h3>Your screening is positive: Consult with a physician or mental health clinician at your nearest VA Clinic.</h3>
                            {renderMoreResourcesButton()}
                        </div>
                    )}
                    {answers[8] > 0 && (
                        <div>
                            <p>Given your reports of having thoughts of being better off dead or thoughts about hurting yourself, it is recommended you consider the many suicide prevention resources VA has to offer from self-help resources, suicide prevention programs, mental health services, and many more.</p>
                            <a
                                href="https://www.veteranscrisisline.net/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: '#002366',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                }}
                            >
                                Click here to access information about the Crisis Line for Veterans
                            </a>
                        </div>
                    )}
                </div>
            );
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
            padding: '50px',
            width: '100vw',
        }}>
            <h2 style={{
                marginBottom: '20px',
                fontSize: '2.5rem',
            }}>Results</h2>
            <div style={{
                backgroundColor: '#B22234',
                borderRadius: '10px',
                padding: '30px',
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
            }}>
                {renderResults()}
                {renderClinics()}
            </div>
            <button onClick={() => navigate('/dashboard')} style={{
                background: '#B22234',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px',
                width: '300px',
            }}>
                Return to Dashboard
            </button>
        </div>
    );
};

export default ResultsPage;
