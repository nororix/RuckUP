import axiosClient from "./axiosClient";

export async function login({ email, password }) {
  try {
    const res = await axiosClient.post('/auth/login', { email, password });
    const data = res.data;

    localStorage.setItem('token', data.token);
    return {
      name: data.user.name,
      role: data.user.role
    };
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Credenciales incorrectas');
  }
}

export async function signup({ name, email, password, gender, role }) {
  try {
    const res = await axiosClient.post('/auth/register', {
      name,
      email,
      password,
      gender,
      role
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Error al registrarse');
  }
}

