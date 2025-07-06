import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Obtener discotecas
export const fetchDiscotecas = createAsyncThunk(
  'discoteca/fetchDiscotecas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/discotecas');
      return response.data.discotecas;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener discotecas');
    }
  }
);

// Obtener una discoteca por ID
export const fetchDiscotecaById = createAsyncThunk(
  'discoteca/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/discotecas/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener la discoteca');
    }
  }
);

// Crear discoteca
export const createDiscoteca = createAsyncThunk(
  'discoteca/create',
  async (discotecaData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/discotecas', discotecaData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear la discoteca');
    }
  }
);

// Actualizar discoteca
export const updateDiscoteca = createAsyncThunk(
  'discoteca/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/discotecas/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar la discoteca');
    }
  }
);

// Obtener discoteca del usuario actual
export const fetchMiDiscoteca = createAsyncThunk(
  'discoteca/fetchMiDiscoteca',
  async (_, { rejectWithValue }) => {
    try {
      // Por ahora obtenemos todas y tomamos la primera
      // En el futuro esto debería filtrar por el usuario actual
      const response = await axios.get('/discotecas');
      return response.data.discotecas[0] || null;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener tu discoteca');
    }
  }
);

const initialState = {
  discotecas: [],
  currentDiscoteca: null,
  miDiscoteca: null,
  loading: false,
  error: null,
};

const discotecaSlice = createSlice({
  name: 'discoteca',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentDiscoteca: (state, action) => {
      state.currentDiscoteca = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch discotecas
      .addCase(fetchDiscotecas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscotecas.fulfilled, (state, action) => {
        state.loading = false;
        state.discotecas = action.payload;
      })
      .addCase(fetchDiscotecas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch discoteca by ID
      .addCase(fetchDiscotecaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscotecaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDiscoteca = action.payload;
      })
      .addCase(fetchDiscotecaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create discoteca
      .addCase(createDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        state.discotecas.push(action.payload);
        state.miDiscoteca = action.payload;
      })
      .addCase(createDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update discoteca
      .addCase(updateDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.discotecas.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.discotecas[index] = action.payload;
        }
        if (state.currentDiscoteca?.id === action.payload.id) {
          state.currentDiscoteca = action.payload;
        }
        if (state.miDiscoteca?.id === action.payload.id) {
          state.miDiscoteca = action.payload;
        }
      })
      .addCase(updateDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch mi discoteca
      .addCase(fetchMiDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        state.miDiscoteca = action.payload;
      })
      .addCase(fetchMiDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentDiscoteca } = discotecaSlice.actions;
export default discotecaSlice.reducer;