import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default RoleRoute;




