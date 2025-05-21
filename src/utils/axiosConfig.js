import axios from 'axios';

// Crear una instancia de axios con la URL base
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Usa la variable de entorno o un valor por defecto
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
API.interceptors.request.use(
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

// Interceptor para manejar errores en las respuestas
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (No autorizado) y no es un retry, intentar renovar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Aquí iría la lógica para renovar el token usando un refresh token si lo implementan
        // const refreshToken = localStorage.getItem('refreshToken');
        // const response = await axios.post('/auth/refresh-token', { refreshToken });
        // localStorage.setItem('token', response.data.token);
        
        // Volvemos a realizar la petición original con el nuevo token
        // originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        // return axios(originalRequest);
        
        // Por ahora, simplemente redirigimos al login
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (err) {
        console.error('Error al renovar el token', err);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;