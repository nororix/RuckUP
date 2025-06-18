import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: baseURL + '/api',
});

axiosClient.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) =>{
    return Promise.reject(error);
});

export default axiosClient;