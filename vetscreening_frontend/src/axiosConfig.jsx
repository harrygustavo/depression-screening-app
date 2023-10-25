import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Replace with your Django backend base URL
});

export const setAuthToken = token => {
    if (token) {
        // Applying token
        instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        // Removing the token from header
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default instance;
