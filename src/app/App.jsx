import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../store';
import { verifyToken } from '../store/slices/authSlice';
import { fetchMiDiscoteca } from '../store/slices/discotecaSlice';
import { ToastContainer } from 'react-toastify';

// Auth Pages
import Login from '../features/auth/pages/Login';
import RegistroDiscoteca from '../features/auth/pages/RegistroDiscoteca';
import ResetPassword from '../features/auth/pages/ResetPassword';

// Layout
import AdminLayout from '../layouts/AdminLayout';

// Dashboard Pages
import Dashboard from '../features/dashboard/pages/Dashboard';
import MiDiscoteca from '../features/mi-discoteca/pages/MiDiscoteca';
import Mesas from '../features/mesas/pages/Mesas';
import ConfiguracionMesas from '../features/mesas/pages/ConfiguracionMesas';
import Entradas from '../features/entradas/pages/Entradas';
import Reservas from '../features/reservas/pages/Reservas';
import CalendarioReservas from '../features/reservas/pages/CalendarioReservas';
import Eventos from '../features/eventos/pages/Eventos';
import Promociones from '../features/promociones/pages/Promociones';
import Personal from '../features/personal/pages/Personal';
import Finanzas from '../features/finanzas/pages/Finanzas';
import Reportes from '../features/finanzas/pages/Reportes';
import Configuracion from '../features/configuracion/pages/Configuracion';

import '../assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

// Componente para manejar rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente interno para manejar las rutas con acceso al estado
const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const { miDiscoteca } = useSelector((state) => state.discoteca);

  useEffect(() => {
    // Verificar token al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(verifyToken());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    // Si está autenticado, verificar si tiene discoteca
    if (isAuthenticated) {
      dispatch(fetchMiDiscoteca());
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
      {/* Rutas públicas de autenticación */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } 
      />
      
      <Route 
        path="/reset-password" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        } 
      />

      {/* Ruta de registro de discoteca (sin layout) */}
      <Route 
        path="/registro-discoteca" 
        element={
          <ProtectedRoute>
            <RegistroDiscoteca />
          </ProtectedRoute>
        } 
      />

      {/* Rutas protegidas con AdminLayout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mi-discoteca" element={<MiDiscoteca />} />
                <Route path="/mesas" element={<Mesas />} />
                <Route path="/mesas/categorias" element={<ConfiguracionMesas />} />
                <Route path="/entradas" element={<Entradas />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/reservas/calendario" element={<CalendarioReservas />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/promociones" element={<Promociones />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/finanzas" element={<Finanzas />} />
                <Route path="/finanzas/reportes" element={<Reportes />} />
                <Route path="/configuracion" element={<Configuracion />} />
                
                {/* Ruta por defecto dentro del admin */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Ruta raíz */}
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
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