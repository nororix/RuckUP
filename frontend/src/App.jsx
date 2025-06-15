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

  // Solo redirigimos si hay un usuario autenticado Y ya terminó de cargar
  if (!isLoading && user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // En cualquier otro caso (cargando o sin usuario), mostramos el contenido público
  return children;
}

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Mientras está cargando, mostramos loading
  if (isLoading) {
    return <div>Cargando...</div>; // O tu componente de loading
  }

  // Si hay usuario, permite acceso. Si no, redirige a home
  return user ? children : <Navigate to="/" replace />;
}

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




// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import CoachDashboard from './pages/CoachDashboard';
// import PlayerDashboard from './pages/PlayerDashboard';
// import RoleRoute from './components/RoleRoutes';
// import { AuthProvider, useAuth } from './context/AuthContext';

// // function PublicRoute({ children }) {
// //   const { user } = useAuth();
// //   if (user) {
// //     return <Navigate to={`/${user.role}`} replace />;
// //   }
// //   return children;
// // }

// // function PrivateRoute({ children }) {
// //   const { user } = useAuth();
// //   return user ? children : <Navigate to="/" replace />;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <PublicRoute>
// //                 <Home />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/login"
// //             element={
// //               <PublicRoute>
// //                 <Login />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/signup"
// //             element={
// //               <PublicRoute>
// //                 <Signup />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/coach"
// //             element={
// //               <PrivateRoute>
// //                 <RoleRoute allowedRole="coach">
// //                   <CoachDashboard />
// //                 </RoleRoute>
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/player"
// //             element={
// //               <PrivateRoute>
// //                 <RoleRoute allowedRole="player">
// //                   <PlayerDashboard />
// //                 </RoleRoute>
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </AuthProvider>
// //     </BrowserRouter>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Routes>
// //           <Route path="*" element={<Home />} />
// //         </Routes>
// //       </AuthProvider>
// //     </BrowserRouter>
// //   );
// // }

// // ✅ PUBLIC ROUTE: Si hay user, redirige. Si no, deja entrar.
// // function PublicRoute({ children }) {
// //   const { user } = useAuth();

// //   if (user === undefined) return null; // Espera a que cargue
// //   if (user) return <Navigate to={`/${user.role}`} replace />;
// //   return children;
// // }

// // // ✅ PRIVATE ROUTE: Si no hay user, redirige. Si sí, deja pasar.
// // function PrivateRoute({ children }) {
// //   const { user } = useAuth();

// //   if (user === undefined) return null; // Espera a que cargue
// //   return user ? children : <Navigate to="/" replace />;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <PublicRoute>
// //                 <Home />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/login"
// //             element={
// //               <PublicRoute>
// //                 <Login />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/signup"
// //             element={
// //               <PublicRoute>
// //                 <Signup />
// //               </PublicRoute>
// //             }
// //           />
// //           <Route
// //             path="/coach"
// //             element={
// //               <PrivateRoute>
// //                 <RoleRoute allowedRole="coach">
// //                   <CoachDashboard />
// //                 </RoleRoute>
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/player"
// //             element={
// //               <PrivateRoute>
// //                 <RoleRoute allowedRole="player">
// //                   <PlayerDashboard />
// //                 </RoleRoute>
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </AuthProvider>
// //     </BrowserRouter>
// //   );
// // }

// function PublicRoute({ children }) {
//   const { user } = useAuth();

//   if (user) return <Navigate to={`/${user.role}`} replace />;
//   return children; // Mostramos Home, Login o Signup mientras user es null o undefined
// }

// function PrivateRoute({ children }) {
//   const { user } = useAuth();

//   if (user === undefined) return null; // Puedes poner un loader aquí si quieres
//   return user ? children : <Navigate to="/" replace />;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <Home />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <PublicRoute>
//                 <Signup />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/coach"
//             element={
//               <PrivateRoute>
//                 <RoleRoute allowedRole="coach">
//                   <CoachDashboard />
//                 </RoleRoute>
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/player"
//             element={
//               <PrivateRoute>
//                 <RoleRoute allowedRole="player">
//                   <PlayerDashboard />
//                 </RoleRoute>
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }
