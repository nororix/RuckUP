import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTrainings = async () => {
  const res = await axiosInstance.get('/trainings');
  return res.data;
};

export const createTraining = async (trainingData) => {
  const res = await axiosInstance.post('/trainings', trainingData);
  return res.data;
};

export const deleteTraining = async (id) => {
  const res = await axiosInstance.delete(`/trainings/${id}`);
  return res.data;
};

export const updateTraining = async (id, updatedData) => {
  const res = await axiosInstance.put(`/trainings/${id}`, updatedData);
  return res.data;
};

