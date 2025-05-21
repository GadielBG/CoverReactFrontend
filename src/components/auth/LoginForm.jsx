import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Limpiar error específico cuando el usuario comienza a escribir
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Validar el formulario
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await login(formData);
        
        // Redirigir a la página de inicio si el login es exitoso
        navigate('/');
      } catch (err) {
        console.error('Error durante el inicio de sesión:', err);
        // Los errores de la API ya están manejados en el contexto
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Iniciar Sesión</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${formErrors.email ? 'input-error' : ''}`}
          />
          {formErrors.email && <span className="error-text">{formErrors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input ${formErrors.password ? 'input-error' : ''}`}
          />
          {formErrors.password && <span className="error-text">{formErrors.password}</span>}
        </div>
        
        <button 
          type="submit" 
          className="w-full btn btn-primary py-2.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : 'Iniciar Sesión'}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;