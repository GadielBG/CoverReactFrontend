import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../store';
import { verifyToken } from '../store/slices/authSlice';
import { ToastContainer } from 'react-toastify';

// Auth Pages
import Login from '../features/auth/pages/Login';
import RegistroDiscoteca from '../features/auth/pages/RegistroDiscoteca';
import ResetPassword from '../features/auth/pages/ResetPassword';

// Dashboard
import Dashboard from '../features/dashboard/pages/Dashboard';

import '../assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

// Componente interno para manejar las rutas con acceso al estado
const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Verificar token al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(verifyToken());
    }
  }, [dispatch, isAuthenticated]);

  // Mostrar loading mientras se verifica el token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Ruta de login */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/registro-discoteca" replace /> : <Login />
        } 
      />
      
      {/* Ruta de reset password */}
      <Route 
        path="/reset-password" 
        element={
          isAuthenticated ? <Navigate to="/registro-discoteca" replace /> : <ResetPassword />
        } 
      />

      {/* Ruta protegida: Registro de discoteca */}
      <Route 
        path="/registro-discoteca" 
        element={
          isAuthenticated ? <RegistroDiscoteca /> : <Navigate to="/login" replace />
        } 
      />

      {/* Ruta protegida: Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        } 
      />

      {/* Ruta por defecto */}
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/registro-discoteca" : "/login"} replace />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;