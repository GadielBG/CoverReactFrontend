import axios from 'axios';
import { store } from '../store';
import { resetAuth } from '../store/slices/authSlice';

// Configuración base de Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3030/personas',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token ha expirado o es inválido
    if (error.response?.status === 401) {
      // Limpiar datos de autenticación
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Resetear estado de autenticación
      store.dispatch(resetAuth());
      
      // Redirigir al login solo si no estamos ya en una página de auth
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register') && 
          !window.location.pathname.includes('/reset-password')) {
        window.location.href = '/login';
      }
    }

    // Manejar otros errores
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Error de conexión';

    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

export default axiosInstance;