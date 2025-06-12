import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">Bienvenido a Ruck Up</h1>
      <p className="mb-5 text-center">
        Por favor, inicia sesión o regístrate para continuar.
      </p>
      <div>
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate('/signup')}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
