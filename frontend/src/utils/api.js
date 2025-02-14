import axiosInstance from './axios';

// authentication
export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const registerApi = (data) => axiosInstance.post('/auth/register', data);
