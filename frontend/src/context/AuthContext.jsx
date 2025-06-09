import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {login as loginRequest} from '../api/auth';

const AuthContext = createContext();

export function AuthProvider ({children}) {
    const [user, setUser] = useState (null);
    const navigate = useNavigate();

    const login = async (data) =>{
        try {
            const {name, role} = await loginRequest (data.email, data.password);
            setUser ({name, role});
            navigate(`/${role}`);
        }catch (err){
            alert (err.message);
        }
    }

    const logout = () => {
        setUser (null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value ={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};
