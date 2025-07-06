import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Obtener todos los eventos
export const fetchEventos = createAsyncThunk(
  'eventos/fetchEventos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/eventos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener eventos');
    }
  }
);

// Obtener eventos por discoteca
export const fetchEventosByDiscoteca = createAsyncThunk(
  'eventos/fetchByDiscoteca',
  async (discotecaId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/eventos/discoteca/${discotecaId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener eventos de la discoteca');
    }
  }
);

// Obtener un evento por ID
export const fetchEventoById = createAsyncThunk(
  'eventos/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/eventos/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener el evento');
    }
  }
);

// Crear evento
export const createEvento = createAsyncThunk(
  'eventos/create',
  async (eventoData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/eventos', eventoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear el evento');
    }
  }
);

// Actualizar evento
export const updateEvento = createAsyncThunk(
  'eventos/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/eventos/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar el evento');
    }
  }
);

// Eliminar evento
export const deleteEvento = createAsyncThunk(
  'eventos/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/eventos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar el evento');
    }
  }
);

const initialState = {
  eventos: [],
  currentEvento: null,
  loading: false,
  error: null,
};

const eventosSlice = createSlice({
  name: 'eventos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEvento: (state, action) => {
      state.currentEvento = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch eventos
      .addCase(fetchEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos = action.payload;
      })
      .addCase(fetchEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch eventos by discoteca
      .addCase(fetchEventosByDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventosByDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos = action.payload;
      })
      .addCase(fetchEventosByDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch evento by ID
      .addCase(fetchEventoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvento = action.payload;
      })
      .addCase(fetchEventoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create evento
      .addCase(createEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvento.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos.push(action.payload);
      })
      .addCase(createEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update evento
      .addCase(updateEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvento.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventos.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.eventos[index] = action.payload;
        }
        if (state.currentEvento?.id === action.payload.id) {
          state.currentEvento = action.payload;
        }
      })
      .addCase(updateEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete evento
      .addCase(deleteEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvento.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos = state.eventos.filter(e => e.id !== action.payload);
      })
      .addCase(deleteEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentEvento } = eventosSlice.actions;
export default eventosSlice.reducer;