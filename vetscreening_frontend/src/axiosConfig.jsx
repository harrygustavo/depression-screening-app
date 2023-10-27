import axios from 'axios';


const base_url = import.meta.env.VITE_BASE_URL
const instance = axios.create({
    baseURL: `http://${base_url}/api/`, // Replace with your Django backend base URL
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
