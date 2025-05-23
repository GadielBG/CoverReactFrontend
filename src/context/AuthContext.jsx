import { createContext, useState, useEffect, useContext } from 'react';
import { checkAuth, loginUser, logoutUser, registerUser } from '../api/auth';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para verificar la autenticación al cargar la página
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Si hay un token en localStorage, verificamos si es válido
        if (localStorage.getItem('token')) {
          const userData = await checkAuth();
          // El backend devuelve un array de personas, tomamos la primera
          if (userData && userData.length > 0) {
            setCurrentUser(userData[0]);
          }
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Función para registrar un usuario
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      
      // Si el registro incluye automáticamente el login, manejar el token
      if (response.token) {
        setCurrentUser(response.user || response.persona);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || (typeof err === 'string' ? err : 'Error al registrar usuario');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      
      // Manejar la respuesta del backend
      if (response.token) {
        // Si la respuesta incluye datos del usuario, los usamos
        if (response.user || response.persona) {
          setCurrentUser(response.user || response.persona);
        } else {
          // Si no, intentamos obtener los datos del usuario
          try {
            const userData = await checkAuth();
            if (userData && userData.length > 0) {
              setCurrentUser(userData[0]);
            }
          } catch (authError) {
            console.warn('No se pudieron obtener los datos del usuario después del login');
          }
        }
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || (typeof err === 'string' ? err : 'Error al iniciar sesión');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Objeto de valor para el contexto
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;