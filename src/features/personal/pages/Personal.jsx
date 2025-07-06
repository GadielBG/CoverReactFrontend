import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonalByDiscoteca, registerPersonal, updatePersonal, deletePersonal } from '../../../store/slices/personalSlice';
import { toast } from 'react-toastify';

const Personal = () => {
  const dispatch = useDispatch();
  const { miDiscoteca } = useSelector((state) => state.discoteca);
  const { personalList, loading, error } = useSelector((state) => state.personal);
  
  const [showModal, setShowModal] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(null);
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo: '',
    contrasena: '',
    nombre_completo: '',
    telefono: '',
    carnet: '',
    numero_referencia: '',
    tipo_contrato: 'permanente',
  });

  useEffect(() => {
    if (miDiscoteca?.id) {
      dispatch(fetchPersonalByDiscoteca(miDiscoteca.id));
    }
  }, [dispatch, miDiscoteca]);

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
      if (editingPersonal) {
        await dispatch(updatePersonal({ 
          id: editingPersonal.id, 
          data: {
            numero_referencia: formData.numero_referencia,
            tipo_contrato: formData.tipo_contrato,
          }
        })).unwrap();
        toast.success('Personal actualizado exitosamente');
      } else {
        await dispatch(registerPersonal(formData)).unwrap();
        toast.success('Personal registrado exitosamente');
      }
      
      handleCloseModal();
      // Recargar lista
      dispatch(fetchPersonalByDiscoteca(miDiscoteca.id));
    } catch (error) {
      toast.error(error || 'Error al guardar personal');
    }
  };

  const handleEdit = (personal) => {
    setEditingPersonal(personal);
    setFormData({
      nombre_usuario: personal.persona?.nombre_usuario || '',
      correo: personal.persona?.correo || '',
      contrasena: '',
      nombre_completo: personal.persona?.nombre_completo || '',
      telefono: personal.persona?.telefono || '',
      carnet: personal.persona?.carnet || '',
      numero_referencia: personal.numero_referencia || '',
      tipo_contrato: personal.tipo_contrato || 'permanente',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este personal?')) {
      try {
        await dispatch(deletePersonal(id)).unwrap();
        toast.success('Personal eliminado exitosamente');
        dispatch(fetchPersonalByDiscoteca(miDiscoteca.id));
      } catch (error) {
        toast.error(error || 'Error al eliminar personal');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPersonal(null);
    setFormData({
      nombre_usuario: '',
      correo: '',
      contrasena: '',
      nombre_completo: '',
      telefono: '',
      carnet: '',
      numero_referencia: '',
      tipo_contrato: 'permanente',
    });
  };

  const getRolColor = (rol) => {
    const colors = {
      administrador: 'bg-purple-100 text-purple-800',
      gerente: 'bg-blue-100 text-blue-800',
      cajero: 'bg-green-100 text-green-800',
      mesero: 'bg-yellow-100 text-yellow-800',
      seguridad: 'bg-red-100 text-red-800',
      dj: 'bg-pink-100 text-pink-800',
    };
    return colors[rol] || 'bg-gray-100 text-gray-800';
  };

  if (!miDiscoteca) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Primero debes registrar tu discoteca</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Personal</h1>
          <p className="text-gray-600 mt-2">Administra el personal de tu discoteca</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Nuevo Personal
        </button>
      </div>

      {/* Lista de personal */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : personalList.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No hay personal registrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Personal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contrato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {personalList.map((personal) => (
                  <tr key={personal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {personal.persona?.nombre_completo}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{personal.persona?.nombre_usuario}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {personal.persona?.correo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {personal.persona?.telefono}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {personal.numero_referencia || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {personal.tipo_contrato}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {personal.personal_discotecas && personal.personal_discotecas.length > 0 ? (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getRolColor(personal.personal_discotecas[0].rol_personal)
                        }`}>
                          {personal.personal_discotecas[0].rol_personal}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Sin asignar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        personal.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {personal.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(personal)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(personal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de creación/edición */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingPersonal ? 'Editar Personal' : 'Nuevo Personal'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Solo mostrar campos de creación si es nuevo */}
                {!editingPersonal && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre de Usuario *
                      </label>
                      <input
                        type="text"
                        name="nombre_usuario"
                        value={formData.nombre_usuario}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contraseña *
                      </label>
                      <input
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre_completo"
                        value={formData.nombre_completo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Carnet *
                      </label>
                      <input
                        type="text"
                        name="carnet"
                        value={formData.carnet}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                <div className={editingPersonal ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Referencia
                  </label>
                  <input
                    type="text"
                    name="numero_referencia"
                    value={formData.numero_referencia}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className={editingPersonal ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Contrato
                  </label>
                  <select
                    name="tipo_contrato"
                    value={formData.tipo_contrato}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="permanente">Permanente</option>
                    <option value="temporal">Temporal</option>
                    <option value="medio_tiempo">Medio Tiempo</option>
                    <option value="por_evento">Por Evento</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  {editingPersonal ? 'Actualizar' : 'Registrar'} Personal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;