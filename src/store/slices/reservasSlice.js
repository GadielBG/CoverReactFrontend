import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Obtener todas las reservas
export const fetchReservas = createAsyncThunk(
  'reservas/fetchReservas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/reservas');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener reservas');
    }
  }
);

// Obtener reservas por discoteca
export const fetchReservasByDiscoteca = createAsyncThunk(
  'reservas/fetchByDiscoteca',
  async (discotecaId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reservas/discoteca/${discotecaId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener reservas de la discoteca');
    }
  }
);

// Obtener una reserva por ID
export const fetchReservaById = createAsyncThunk(
  'reservas/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reservas/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener la reserva');
    }
  }
);

// Crear reserva
export const createReserva = createAsyncThunk(
  'reservas/create',
  async (reservaData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/reservas', reservaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear la reserva');
    }
  }
);

// Actualizar estado de reserva
export const updateReservaEstado = createAsyncThunk(
  'reservas/updateEstado',
  async ({ id, estado }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/reservas/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar el estado de la reserva');
    }
  }
);

// Cancelar reserva
export const cancelarReserva = createAsyncThunk(
  'reservas/cancelar',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/reservas/${id}/cancelar`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al cancelar la reserva');
    }
  }
);

// Obtener reservas por fecha
export const fetchReservasByFecha = createAsyncThunk(
  'reservas/fetchByFecha',
  async ({ discotecaId, fecha }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reservas/discoteca/${discotecaId}/fecha/${fecha}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener reservas por fecha');
    }
  }
);

const initialState = {
  reservas: [],
  currentReserva: null,
  reservasByFecha: {},
  loading: false,
  error: null,
  filtros: {
    estado: 'todas',
    fecha: null,
    mesa: null,
  },
};

const reservasSlice = createSlice({
  name: 'reservas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentReserva: (state, action) => {
      state.currentReserva = action.payload;
    },
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = {
        estado: 'todas',
        fecha: null,
        mesa: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reservas
      .addCase(fetchReservas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservas.fulfilled, (state, action) => {
        state.loading = false;
        state.reservas = action.payload;
      })
      .addCase(fetchReservas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch reservas by discoteca
      .addCase(fetchReservasByDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservasByDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        state.reservas = action.payload;
      })
      .addCase(fetchReservasByDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch reserva by ID
      .addCase(fetchReservaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReserva = action.payload;
      })
      .addCase(fetchReservaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create reserva
      .addCase(createReserva.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReserva.fulfilled, (state, action) => {
        state.loading = false;
        state.reservas.push(action.payload);
      })
      .addCase(createReserva.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update estado reserva
      .addCase(updateReservaEstado.fulfilled, (state, action) => {
        const index = state.reservas.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservas[index] = action.payload;
        }
        if (state.currentReserva?.id === action.payload.id) {
          state.currentReserva = action.payload;
        }
      })
      
      // Cancelar reserva
      .addCase(cancelarReserva.fulfilled, (state, action) => {
        const index = state.reservas.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservas[index] = action.payload;
        }
      })
      
      // Fetch reservas by fecha
      .addCase(fetchReservasByFecha.fulfilled, (state, action) => {
        const fecha = action.meta.arg.fecha;
        state.reservasByFecha[fecha] = action.payload;
      });
  },
});

export const { clearError, setCurrentReserva, setFiltros, clearFiltros } = reservasSlice.actions;
export default reservasSlice.reducer;