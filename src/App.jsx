import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Mostrar un indicador de carga mientras verificamos la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Mostrar el contenido protegido si está autenticado
  return children;
};

// Componente para rutas de invitado (solo accesibles si NO está autenticado)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Mostrar un indicador de carga mientras verificamos la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  // Redirigir a la página principal si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // Mostrar el contenido para invitados si NO está autenticado
  return children;
};

// Página principal (protegida)
const Home = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido a COVER</h1>
    <p className="text-lg text-gray-700">Aquí puedes ver tus reservas y entradas para discotecas.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route 
            path="/login" 
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } 
          />
          
          {/* Rutas protegidas */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirigir cualquier ruta desconocida a la página principal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;