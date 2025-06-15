import axios from "axios";

const BASE_URL = 'api/attendances';

// export async function getAttendanceByTraining(trainingId) {
//     const res = await axios.get(BASE_URL);
//     return res.data.filter(a => a.training._id === trainingId);
// }

export async function getAttendanceByTraining(trainingId) {
  const res = await axios.get(`${BASE_URL}/training/${trainingId}`);
  return res.data; 
}

export async function updateAttendance(id, updateData) {
  const res = await axios.put(`${BASE_URL}/${id}`, updateData);
  return res.data;
}