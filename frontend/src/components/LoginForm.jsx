import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm (){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            await login({ email, password });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
    <div className="form-wrapper d-flex justify-content-center">
    <form onSubmit={handleSubmit} className="custom-form p-4 mt-5 shadow-sm">
        <div className="mb-3">
        <label>Email</label>
        <input
            name="email"
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
            name="password"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn custom-btn w-100">Entrar</button>
    </form>
    </div>

    )
}



