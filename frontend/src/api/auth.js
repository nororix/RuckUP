import axiosClient from "./axiosClient";

export async function login({ email, password }) {
  try {
    const res = await axiosClient.post('/auth/login', { email, password });
    const data = res.data;

    localStorage.setItem('token', data.token);
    return {
      name: data.user.nombre,
      role: data.user.rol
    };
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Credenciales incorrectas');
  }
}

export async function signup({ nombre, email, password, genero, rol }) {
  try {
    const res = await axiosClient.post('/auth/register', {
      nombre,
      email,
      password,
      genero,
      rol
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Error al registrarse');
  }
}
