import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../lib/axios';

const RegistroDiscoteca = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_contacto: '',
    capacidad_total: '',
    horario_apertura: '',
    horario_cierre: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre?.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2 || formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre debe tener entre 2 y 100 caracteres';
    }

    // Validar dirección
    if (!formData.direccion?.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.length < 10 || formData.direccion.length > 255) {
      newErrors.direccion = 'La dirección debe tener entre 10 y 255 caracteres';
    }

    // Validar teléfono (opcional)
    if (formData.telefono && !/^[67]\d{7}$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido (ej: 70123456)';
    }

    // Validar correo (opcional)
    if (formData.correo_contacto) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo_contacto)) {
        newErrors.correo_contacto = 'El formato del correo no es válido';
      }
    }

    // Validar capacidad
    if (!formData.capacidad_total) {
      newErrors.capacidad_total = 'La capacidad total es requerida';
    } else if (parseInt(formData.capacidad_total) < 1) {
      newErrors.capacidad_total = 'La capacidad debe ser mayor a 0';
    } else if (parseInt(formData.capacidad_total) > 10000) {
      newErrors.capacidad_total = 'La capacidad parece muy alta, verifica el valor';
    }

    // Validar horarios
    if (formData.horario_apertura && formData.horario_cierre) {
      const apertura = new Date(`2000-01-01 ${formData.horario_apertura}`);
      const cierre = new Date(`2000-01-01 ${formData.horario_cierre}`);
      
      // Permitir que el cierre sea al día siguiente
      if (cierre <= apertura) {
        cierre.setDate(cierre.getDate() + 1);
      }
      
      const diffHours = (cierre - apertura) / (1000 * 60 * 60);
      if (diffHours < 2) {
        newErrors.horario_cierre = 'La discoteca debe estar abierta al menos 2 horas';
      } else if (diffHours > 12) {
        newErrors.horario_cierre = 'El horario de operación parece muy largo, verifica los horarios';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Preparar datos para envío
      const dataToSend = {
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono || null,
        correo_contacto: formData.correo_contacto || null,
        capacidad_total: parseInt(formData.capacidad_total),
        horario_apertura: formData.horario_apertura || null,
        horario_cierre: formData.horario_cierre || null,
        estado: 'activo'
      };

      const response = await axios.post('/discotecas/registrar', dataToSend);
      
      toast.success('¡Discoteca registrada exitosamente!');
      // Redirigir al dashboard (o donde corresponda después del registro)
      navigate('/dashboard');
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al registrar la discoteca';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Registra tu Discoteca
              </h2>
              <p className="mt-2 text-purple-100">
                Bienvenido {user?.nombre_completo}, completa la información de tu discoteca
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Nombre de la discoteca */}
              <div className="lg:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Discoteca *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.nombre ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Club Phoenix"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="lg:col-span-2">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <textarea
                  id="direccion"
                  name="direccion"
                  rows={3}
                  required
                  value={formData.direccion}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.direccion ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Av. Arce #123, Zona Central, La Paz"
                />
                {errors.direccion && (
                  <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.telefono ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="70123456"
                />
                {errors.telefono && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                )}
              </div>

              {/* Correo de contacto */}
              <div>
                <label htmlFor="correo_contacto" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo de Contacto
                </label>
                <input
                  id="correo_contacto"
                  name="correo_contacto"
                  type="email"
                  value={formData.correo_contacto}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.correo_contacto ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="info@midiscoteca.com"
                />
                {errors.correo_contacto && (
                  <p className="mt-1 text-sm text-red-600">{errors.correo_contacto}</p>
                )}
              </div>

              {/* Capacidad total */}
              <div>
                <label htmlFor="capacidad_total" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidad Total *
                </label>
                <input
                  id="capacidad_total"
                  name="capacidad_total"
                  type="number"
                  min="1"
                  max="10000"
                  required
                  value={formData.capacidad_total}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.capacidad_total ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="500"
                />
                {errors.capacidad_total && (
                  <p className="mt-1 text-sm text-red-600">{errors.capacidad_total}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Número máximo de personas que pueden estar en la discoteca
                </p>
              </div>

              {/* Horarios */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="horario_apertura" className="block text-sm font-medium text-gray-700 mb-2">
                    Hora de Apertura
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
                    Hora de Cierre
                  </label>
                  <input
                    id="horario_cierre"
                    name="horario_cierre"
                    type="time"
                    value={formData.horario_cierre}
                    onChange={handleChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.horario_cierre ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.horario_cierre && (
                    <p className="mt-1 text-sm text-red-600">{errors.horario_cierre}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Puede ser al día siguiente
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registrando Discoteca...
                  </div>
                ) : (
                  'Registrar Discoteca'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroDiscoteca;