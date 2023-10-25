import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.224.7.77/api/', // Replace with your Django backend base URL
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
