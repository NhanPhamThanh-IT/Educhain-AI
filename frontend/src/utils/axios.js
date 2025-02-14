import axios from 'axios';
import { PATH_AUTH } from '../routes/paths';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

// Add a request interceptor to set the Authorization header for JWT
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json',
    };

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add error interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Return successful response
    response,
  (error) => {
    // Handle error
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status } = error.response;
      if (status === 403) {
        console.log('Access forbidden');
      } else if (status === 401) {
        // Redirect to the login page
        window.location.href = PATH_AUTH.login;
      } else {
        const errorMessage = error.response.data.message || 'An error occurred';
        console.log(errorMessage);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.log(`Error: ${error.message}`);
    }

    // Pass the error to the calling code
    throw error;
  }
);
export default axiosInstance;
