import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // No es necesario redirigir, ya que el componente ProtectedRoute 
    // lo hará automáticamente cuando isAuthenticated cambie a false
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">COVER</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hola, {currentUser?.name || 'Usuario'}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;