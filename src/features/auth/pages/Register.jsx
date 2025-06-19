import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, clearError } from '../../../store/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    // Datos personales del administrador
    nombre_usuario: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    nombre_completo: '',
    telefono: '',
    carnet: '',
    
    // Datos de la discoteca
    nombre_discoteca: '',
    direccion_discoteca: '',
    telefono_discoteca: '',
    correo_contacto_discoteca: '',
    capacidad_total: '',
    horario_apertura: '',
    horario_cierre: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.contrasena !== formData.confirmarContrasena) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.contrasena.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Preparar datos para envío
    const dataToSend = {
      // Datos del administrador
      administrador: {
        nombre_usuario: formData.nombre_usuario,
        correo: formData.correo,
        contrasena: formData.contrasena,
        nombre_completo: formData.nombre_completo,
        telefono: formData.telefono,
        carnet: formData.carnet,
        rol: 'administrador'
      },
      // Datos de la discoteca
      discoteca: {
        nombre: formData.nombre_discoteca,
        direccion: formData.direccion_discoteca,
        telefono: formData.telefono_discoteca,
        correo_contacto: formData.correo_contacto_discoteca,
        capacidad_total: parseInt(formData.capacidad_total),
        horario_apertura: formData.horario_apertura,
        horario_cierre: formData.horario_cierre,
        estado: 'activo'
      }
    };

    try {
      const result = await dispatch(register(dataToSend));
      if (register.fulfilled.match(result)) {
        toast.success('Registro exitoso. Puedes iniciar sesión ahora.');
        navigate('/login');
      }
    } catch (error) {
      // Error manejado por el slice
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 10h10M7 13h10" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Registrar Nueva Discoteca
              </h2>
              <p className="mt-2 text-purple-100">
                Crea tu cuenta de administrador y registra tu discoteca
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Datos del Administrador */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Datos del Administrador
                </h3>

                {/* Nombre de usuario */}
                <div>
                  <label htmlFor="nombre_usuario" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de usuario *
                  </label>
                  <input
                    id="nombre_usuario"
                    name="nombre_usuario"
                    type="text"
                    required
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="usuario123"
                  />
                </div>

                {/* Nombre completo */}
                <div>
                  <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    id="nombre_completo"
                    name="nombre_completo"
                    type="text"
                    required
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>

                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="admin@midiscoteca.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="70123456"
                  />
                </div>

                {/* Carnet */}
                <div>
                  <label htmlFor="carnet" className="block text-sm font-medium text-gray-700 mb-2">
                    Carnet de identidad *
                  </label>
                  <input
                    id="carnet"
                    name="carnet"
                    type="text"
                    required
                    value={formData.carnet}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="12345678"
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      id="contrasena"
                      name="contrasena"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.contrasena}
                      onChange={handleChange}
                      className="block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar contraseña *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmarContrasena"
                      name="confirmarContrasena"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmarContrasena}
                      onChange={handleChange}
                      className="block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Datos de la Discoteca */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Datos de la Discoteca
                </h3>

                {/* Nombre de la discoteca */}
                <div>
                  <label htmlFor="nombre_discoteca" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la discoteca *
                  </label>
                  <input
                    id="nombre_discoteca"
                    name="nombre_discoteca"
                    type="text"
                    required
                    value={formData.nombre_discoteca}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Club Phoenix"
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label htmlFor="direccion_discoteca" className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección *
                  </label>
                  <input
                    id="direccion_discoteca"
                    name="direccion_discoteca"
                    type="text"
                    required
                    value={formData.direccion_discoteca}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Av. Principal #123, Zona Sur"
                  />
                </div>

                {/* Teléfono de la discoteca */}
                <div>
                  <label htmlFor="telefono_discoteca" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono de la discoteca
                  </label>
                  <input
                    id="telefono_discoteca"
                    name="telefono_discoteca"
                    type="tel"
                    value={formData.telefono_discoteca}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="2-123456"
                  />
                </div>

                {/* Correo de contacto */}
                <div>
                  <label htmlFor="correo_contacto_discoteca" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo de contacto
                  </label>
                  <input
                    id="correo_contacto_discoteca"
                    name="correo_contacto_discoteca"
                    type="email"
                    value={formData.correo_contacto_discoteca}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="info@midiscoteca.com"
                  />
                </div>

                {/* Capacidad total */}
                <div>
                  <label htmlFor="capacidad_total" className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad total *
                  </label>
                  <input
                    id="capacidad_total"
                    name="capacidad_total"
                    type="number"
                    required
                    min="1"
                    value={formData.capacidad_total}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>

                {/* Horarios */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="horario_apertura" className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de apertura
                    </label>
                    <input
                      id="horario_apertura"
                      name="horario_apertura"
                      type="time"
                      value={formData.horario_apertura}
                      onChange={handleChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="horario_cierre" className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de cierre
                    </label>
                    <input
                      id="horario_cierre"
                      name="horario_cierre"
                      type="time"
                      value={formData.horario_cierre}
                      onChange={handleChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                >
                  Ya tengo cuenta
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registrando...
                    </div>
                  ) : (
                    'Registrar Discoteca'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;