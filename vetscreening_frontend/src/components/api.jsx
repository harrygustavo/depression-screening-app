import axios from 'axios';


const base_url = import.meta.env.VITE_BASE_URL
// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: `http://${base_url}/api/`, // Your API URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`, // Include the token here
  },
});

// Example GET request using the axiosInstance
const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('users/profile/'); // Example URL
    console.log('User data:', response.data);
  } catch (error) {
    console.error('Fetch user data error', error);
  }
};

// Call the function to fetch user data
fetchUserData();
