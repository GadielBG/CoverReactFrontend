import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from '../store/slices/authSlice';

// Auth Pages
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ResetPassword from '../features/auth/pages/ResetPassword';

// Admin Routes
import AdminRoutes from './AdminRoutes';

// Layout
import AdminLayout from '../layouts/AdminLayout';

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
      {/* Public Routes - Auth */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        } 
      />

      {/* Protected Admin Routes */}
      <Route 
        path="/*" 
        element={
          isAuthenticated && (user?.rol === 'administrador' || user?.rol === 'propietario') ? (
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Default redirect */}
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        } 
      />
    </Routes>
  );
};

export default AppRoutes;