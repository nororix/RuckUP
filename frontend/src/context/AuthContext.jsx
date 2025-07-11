import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user'); 
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []); 

  const login = async (data) => {
    try {
      const { name, role } = await loginRequest(data);
      const userData = { name, role };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate(`/${role}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

