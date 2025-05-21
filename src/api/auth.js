import API from '../utils/axiosConfig';

// Servicio para el registro de usuarios
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para el inicio de sesión
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      // Si hay refresh token, también lo guardamos
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Servicio para verificar el estado de autenticación
export const checkAuth = async () => {
  try {
    const response = await API.get('/auth/me');
    return response.data;
  } catch (error) {
    logoutUser();
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para actualizar datos del usuario
export const updateUser = async (userData) => {
  try {
    const response = await API.put('/auth/update', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};