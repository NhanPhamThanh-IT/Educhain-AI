import axiosInstance from './axios';

// authentication
export const loginApi = (data) => axiosInstance.post('http://localhost:8000/api/auth/login', data);
export const registerApi = (data) => axiosInstance.post('http://localhost:8000/api/auth/register', data);

// user
export const getUserProfileApi = () => axiosInstance.get('http://localhost:8000/api/user/profile');