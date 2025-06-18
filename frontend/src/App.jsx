import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CoachDashboard from './pages/CoachDashboard';
import PlayerDashboard from './pages/PlayerDashboard';
import RoleRoute from './components/RoleRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';

function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
}
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/coach"
            element={
              <PrivateRoute>
                <RoleRoute allowedRole="coach">
                  <CoachDashboard />
                </RoleRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/player"
            element={
              <PrivateRoute>
                <RoleRoute allowedRole="player">
                  <PlayerDashboard />
                </RoleRoute>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
