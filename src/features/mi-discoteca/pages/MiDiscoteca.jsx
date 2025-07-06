import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMiDiscoteca, updateDiscoteca } from '../../../store/slices/discotecaSlice';
import { toast } from 'react-toastify';

const MiDiscoteca = () => {
  const dispatch = useDispatch();
  const { miDiscoteca, loading } = useSelector((state) => state.discoteca);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_contacto: '',
    capacidad_total: '',
    horario_apertura: '',
    horario_cierre: '',
    estado: '',
  });

  useEffect(() => {
    if (!miDiscoteca) {
      dispatch(fetchMiDiscoteca());
    }
  }, [dispatch, miDiscoteca]);

  useEffect(() => {
    if (miDiscoteca) {
      setFormData({
        nombre: miDiscoteca.nombre || '',
        direccion: miDiscoteca.direccion || '',
        telefono: miDiscoteca.telefono || '',
        correo_contacto: miDiscoteca.correo_contacto || '',
        capacidad_total: miDiscoteca.capacidad_total || '',
        horario_apertura: miDiscoteca.horario_apertura || '',
        horario_cierre: miDiscoteca.horario_cierre || '',
        estado: miDiscoteca.estado || '',
      });
    }
  }, [miDiscoteca]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateDiscoteca({ 
        id: miDiscoteca.id, 
        data: formData 
      })).unwrap();
      
      toast.success('Discoteca actualizada exitosamente');
      setEditMode(false);
    } catch (error) {
      toast.error(error || 'Error al actualizar la discoteca');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    // Restaurar datos originales
    setFormData({
      nombre: miDiscoteca.nombre || '',
      direccion: miDiscoteca.direccion || '',
      telefono: miDiscoteca.telefono || '',
      correo_contacto: miDiscoteca.correo_contacto || '',
      capacidad_total: miDiscoteca.capacidad_total || '',
      horario_apertura: miDiscoteca.horario_apertura || '',
      horario_cierre: miDiscoteca.horario_cierre || '',
      estado: miDiscoteca.estado || '',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!miDiscoteca) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontró información de la discoteca</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Información de la Discoteca
            </h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Editar Información
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Discoteca
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                disabled={!editMode}
                rows={2}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo de Contacto
              </label>
              <input
                type="email"
                name="correo_contacto"
                value={formData.correo_contacto}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Capacidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad Total
              </label>
              <input
                type="number"
                name="capacidad_total"
                value={formData.capacidad_total}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="mantenimiento">En Mantenimiento</option>
              </select>
            </div>

            {/* Horario Apertura */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Apertura
              </label>
              <input
                type="time"
                name="horario_apertura"
                value={formData.horario_apertura}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Horario Cierre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Cierre
              </label>
              <input
                type="time"
                name="horario_cierre"
                value={formData.horario_cierre}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-md ${
                  editMode 
                    ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>
          </div>

          {/* Actions */}
          {editMode && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          )}
        </form>

        {/* Additional Info */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Creada</p>
              <p className="font-semibold">
                {miDiscoteca.creado_en 
                  ? new Date(miDiscoteca.creado_en).toLocaleDateString() 
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID</p>
              <p className="font-semibold">{miDiscoteca.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado Actual</p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                miDiscoteca.estado === 'activo' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {miDiscoteca.estado}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacidad</p>
              <p className="font-semibold">{miDiscoteca.capacidad_total} personas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiDiscoteca;