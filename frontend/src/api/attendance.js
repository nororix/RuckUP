import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAttendanceByTraining = async (trainingId) => {
  const res = await axiosInstance.get(`/attendances/training/${trainingId}`);
  return res.data;
};

export const confirmAttendance = async (trainingId) => {
  const res = await axiosInstance.post("/attendances", { training: trainingId });
  return res.data;
};

export const cancelAttendance = async (attendanceId) => {
  const res = await axiosInstance.delete(`/attendances/${attendanceId}`);
  return res.data;
};

export const updateAttendance = async (attendanceId, updateData) => {
  const res = await axiosInstance.put(`/attendances/${attendanceId}`, updateData);
  return res.data;
};

