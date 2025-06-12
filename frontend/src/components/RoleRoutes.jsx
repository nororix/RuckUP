import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

if (user.rol !== allowedRole) {
  return <Navigate to={`/${allowedRole}`} replace />;
}


  return children;
};

export default RoleRoute;
