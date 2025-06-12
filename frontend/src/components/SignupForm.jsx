import { useState } from "react";
import { signup } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupForm (){
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [genero, setGenero] = useState('femenino');
    const [rol, setRol] = useState('jugador');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signup({ nombre, email, password, genero, rol });
            const user = await login({ email, password });
            navigate(`/${user.rol}`);  
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Nombre</label>
                <input
                    className="form-control"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Email</label>
                <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Contraseña</label>
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Género</label>
                <select
                    className="form-select"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                >
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <div className="mb-3">
                <label>Rol</label>
                <select
                    className="form-select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                >
                    <option value="jugador">Jugador</option>
                    <option value="entrenador">Entrenador</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary">Registrarse</button>
        </form>
    );
}
