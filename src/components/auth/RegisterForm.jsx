import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    carnet: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error específico cuando el usuario comienza a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Validar el formulario
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
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
        // Omitir confirmPassword antes de enviar
        const { confirmPassword, ...userData } = formData;
        await register(userData);
        
        // Redirigir a la página de inicio si el registro es exitoso
        navigate('/');
      } catch (err) {
        console.error('Error durante el registro:', err);
        // Los errores de la API ya están manejados en el contexto
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Crear una cuenta</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input ${formErrors.name ? 'input-error' : ''}`}
            placeholder="Ingresa tu nombre completo"
          />
          {formErrors.name && <span className="error-text">{formErrors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${formErrors.email ? 'input-error' : ''}`}
            placeholder="ejemplo@correo.com"
          />
          {formErrors.email && <span className="error-text">{formErrors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input"
            placeholder="Número de teléfono (opcional)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="carnet" className="form-label">
            Carnet de Identidad
          </label>
          <input
            type="text"
            id="carnet"
            name="carnet"
            value={formData.carnet}
            onChange={handleChange}
            className="input"
            placeholder="Número de CI (opcional)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input ${formErrors.password ? 'input-error' : ''}`}
            placeholder="Mínimo 6 caracteres"
          />
          {formErrors.password && <span className="error-text">{formErrors.password}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar contraseña *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input ${formErrors.confirmPassword ? 'input-error' : ''}`}
            placeholder="Repite tu contraseña"
          />
          {formErrors.confirmPassword && <span className="error-text">{formErrors.confirmPassword}</span>}
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
          ) : 'Registrarse'}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

