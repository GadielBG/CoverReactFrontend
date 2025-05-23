import API from '../utils/axiosConfig';

// Servicio para el registro de clientes
export const registerUser = async (userData) => {
  try {
    // Mapear los campos del frontend a los que espera el backend
    const backendData = {
      nombre_usuario: userData.name, // Usamos el nombre como nombre_usuario
      correo: userData.email,
      contrasena: userData.password,
      nombre_completo: userData.name,
      telefono: userData.telefono || '', // Campo opcional
      carnet: userData.carnet || '' // Campo opcional
    };
    
    const response = await API.post('/persona/registerCliente', backendData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para el inicio de sesión de clientes
export const loginUser = async (credentials) => {
  try {
    // Mapear los campos del frontend a los que espera el backend
    const backendData = {
      correo: credentials.email,
      contrasena: credentials.password
    };
    
    const response = await API.post('/persona/loginCliente', backendData);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para el registro de personal de discoteca
export const registerPersonal = async (userData) => {
  try {
    const backendData = {
      nombre_usuario: userData.name,
      correo: userData.email,
      contrasena: userData.password,
      nombre_completo: userData.name,
      telefono: userData.telefono || '',
      carnet: userData.carnet || ''
    };
    
    const response = await API.post('/persona/registerPersonal', backendData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para el login de personal de discoteca
export const loginPersonal = async (credentials) => {
  try {
    const backendData = {
      correo: credentials.email,
      contrasena: credentials.password
    };
    
    const response = await API.post('/persona/loginPersonal', backendData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
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
    // Obtener información del usuario autenticado
    const response = await API.get('/persona');
    return response.data;
  } catch (error) {
    logoutUser();
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para obtener datos de una persona específica
export const getPersona = async (id) => {
  try {
    const response = await API.get(`/persona/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};

// Servicio para actualizar datos del usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await API.put(`/persona/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de conexión' };
  }
};