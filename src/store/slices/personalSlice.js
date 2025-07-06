import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

// Obtener personal por discoteca
export const fetchPersonalByDiscoteca = createAsyncThunk(
  'personal/fetchByDiscoteca',
  async (discotecaId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/personal/discoteca/${discotecaId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener personal');
    }
  }
);

// Obtener personal por ID
export const fetchPersonalById = createAsyncThunk(
  'personal/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/personal/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener personal');
    }
  }
);

// Registrar personal
export const registerPersonal = createAsyncThunk(
  'personal/register',
  async (personalData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/personal/register', personalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al registrar personal');
    }
  }
);

// Crear personal desde persona existente
export const createPersonalFromPersona = createAsyncThunk(
  'personal/createFromPersona',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/personal/create-from-persona', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear personal');
    }
  }
);

// Completar perfil de personal
export const completePersonalProfile = createAsyncThunk(
  'personal/completeProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/personal/${id}/complete-profile`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al completar perfil');
    }
  }
);

// Actualizar personal
export const updatePersonal = createAsyncThunk(
  'personal/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/personal/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar personal');
    }
  }
);

// Eliminar personal
export const deletePersonal = createAsyncThunk(
  'personal/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/personal/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar personal');
    }
  }
);

const initialState = {
  personalList: [],
  currentPersonal: null,
  loading: false,
  error: null,
};

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPersonal: (state, action) => {
      state.currentPersonal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch personal by discoteca
      .addCase(fetchPersonalByDiscoteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalByDiscoteca.fulfilled, (state, action) => {
        state.loading = false;
        state.personalList = action.payload;
      })
      .addCase(fetchPersonalByDiscoteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch personal by ID
      .addCase(fetchPersonalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPersonal = action.payload;
      })
      .addCase(fetchPersonalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register personal
      .addCase(registerPersonal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPersonal.fulfilled, (state, action) => {
        state.loading = false;
        state.personalList.push(action.payload.personal);
      })
      .addCase(registerPersonal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create personal from persona
      .addCase(createPersonalFromPersona.fulfilled, (state, action) => {
        state.personalList.push(action.payload);
      })
      
      // Complete profile
      .addCase(completePersonalProfile.fulfilled, (state, action) => {
        const index = state.personalList.findIndex(p => p.id === action.payload.personal.id);
        if (index !== -1) {
          state.personalList[index] = action.payload.personal;
        }
      })
      
      // Update personal
      .addCase(updatePersonal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.personalList.findIndex(p => p.id === action.payload.personal.id);
        if (index !== -1) {
          state.personalList[index] = action.payload.personal;
        }
        if (state.currentPersonal?.id === action.payload.personal.id) {
          state.currentPersonal = action.payload.personal;
        }
      })
      .addCase(updatePersonal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete personal
      .addCase(deletePersonal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePersonal.fulfilled, (state, action) => {
        state.loading = false;
        state.personalList = state.personalList.filter(p => p.id !== action.payload.id);
      })
      .addCase(deletePersonal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentPersonal } = personalSlice.actions;
export default personalSlice.reducer;