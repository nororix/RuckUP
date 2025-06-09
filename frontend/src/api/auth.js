export async function login(email, password) {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return { name: data.name, role: data.role };
}

