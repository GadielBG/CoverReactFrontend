import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventosByDiscoteca, createEvento, updateEvento, deleteEvento } from '../../../store/slices/eventosSlice';
import { toast } from 'react-toastify';

const Eventos = () => {
  const dispatch = useDispatch();
  const { miDiscoteca } = useSelector((state) => state.discoteca);
  const { eventos, loading, error } = useSelector((state) => state.eventos);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_evento: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  useEffect(() => {
    if (miDiscoteca?.id) {
      dispatch(fetchEventosByDiscoteca(miDiscoteca.id));
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
      const eventoData = {
        ...formData,
        discoteca_id: miDiscoteca.id,
      };

      if (editingEvento) {
        await dispatch(updateEvento({ 
          id: editingEvento.id, 
          data: eventoData 
        })).unwrap();
        toast.success('Evento actualizado exitosamente');
      } else {
        await dispatch(createEvento(eventoData)).unwrap();
        toast.success('Evento creado exitosamente');
      }
      
      handleCloseModal();
    } catch (error) {
      toast.error(error || 'Error al guardar el evento');
    }
  };

  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setFormData({
      nombre: evento.nombre,
      tipo_evento: evento.tipo_evento || '',
      descripcion: evento.descripcion || '',
      fecha_inicio: evento.fecha_inicio ? new Date(evento.fecha_inicio).toISOString().slice(0, 16) : '',
      fecha_fin: evento.fecha_fin ? new Date(evento.fecha_fin).toISOString().slice(0, 16) : '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await dispatch(deleteEvento(id)).unwrap();
        toast.success('Evento eliminado exitosamente');
      } catch (error) {
        toast.error(error || 'Error al eliminar el evento');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvento(null);
    setFormData({
      nombre: '',
      tipo_evento: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
    });
  };

  const getEstadoColor = (estado) => {
    const colors = {
      activo: 'bg-green-100 text-green-800',
      inactivo: 'bg-gray-100 text-gray-800',
      cancelado: 'bg-red-100 text-red-800',
      finalizado: 'bg-blue-100 text-blue-800',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Eventos</h1>
          <p className="text-gray-600 mt-2">Administra los eventos de tu discoteca</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Nuevo Evento
        </button>
      </div>

      {/* Lista de eventos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : eventos.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No hay eventos registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Inicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Fin
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
                {eventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {evento.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {evento.descripcion}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {evento.tipo_evento || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {evento.fecha_inicio 
                        ? new Date(evento.fecha_inicio).toLocaleString() 
                        : 'No definida'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {evento.fecha_fin 
                        ? new Date(evento.fecha_fin).toLocaleString() 
                        : 'No definida'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(evento.estado)}`}>
                        {evento.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(evento)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(evento.id)}
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
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingEvento ? 'Editar Evento' : 'Nuevo Evento'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre del Evento *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Evento
                  </label>
                  <select
                    name="tipo_evento"
                    value={formData.tipo_evento}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="fiesta">Fiesta</option>
                    <option value="concierto">Concierto</option>
                    <option value="tematico">Temático</option>
                    <option value="especial">Especial</option>
                    <option value="privado">Privado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha y Hora de Inicio
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_inicio"
                    value={formData.fecha_inicio}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha y Hora de Fin
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_fin"
                    value={formData.fecha_fin}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
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
                  {editingEvento ? 'Actualizar' : 'Crear'} Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;