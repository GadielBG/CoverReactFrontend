import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Obtener categorías de mesas
export const fetchCategoriasMesas = createAsyncThunk(
  'mesas/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categorias-mesas');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener categorías');
    }
  }
);

// Crear categoría de mesa
export const createCategoriaMesa = createAsyncThunk(
  'mesas/createCategoria',
  async (categoriaData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/categorias-mesas', categoriaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear categoría');
    }
  }
);

// Obtener mesas
export const fetchMesas = createAsyncThunk(
  'mesas/fetchMesas',
  async (discotecaId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/mesas/discoteca/${discotecaId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener mesas');
    }
  }
);

// Crear mesa
export const createMesa = createAsyncThunk(
  'mesas/create',
  async (mesaData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/mesas', mesaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear mesa');
    }
  }
);

// Actualizar mesa
export const updateMesa = createAsyncThunk(
  'mesas/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/mesas/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar mesa');
    }
  }
);

// Eliminar mesa
export const deleteMesa = createAsyncThunk(
  'mesas/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/mesas/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar mesa');
    }
  }
);

const initialState = {
  mesas: [],
  categorias: [],
  currentMesa: null,
  loading: false,
  error: null,
};

const mesasSlice = createSlice({
  name: 'mesas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentMesa: (state, action) => {
      state.currentMesa = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categorías
      .addCase(fetchCategoriasMesas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriasMesas.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategoriasMesas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create categoría
      .addCase(createCategoriaMesa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoriaMesa.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias.push(action.payload);
      })
      .addCase(createCategoriaMesa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch mesas
      .addCase(fetchMesas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMesas.fulfilled, (state, action) => {
        state.loading = false;
        state.mesas = action.payload;
      })
      .addCase(fetchMesas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create mesa
      .addCase(createMesa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMesa.fulfilled, (state, action) => {
        state.loading = false;
        state.mesas.push(action.payload);
      })
      .addCase(createMesa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update mesa
      .addCase(updateMesa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMesa.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mesas.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.mesas[index] = action.payload;
        }
      })
      .addCase(updateMesa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete mesa
      .addCase(deleteMesa.fulfilled, (state, action) => {
        state.mesas = state.mesas.filter(m => m.id !== action.payload);
      });
  },
});

export const { clearError, setCurrentMesa } = mesasSlice.actions;
export default mesasSlice.reducer;