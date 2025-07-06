import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import discotecaSlice from './slices/discotecaSlice';
import mesasSlice from './slices/mesasSlice';
import eventosSlice from './slices/eventosSlice';
import personalSlice from './slices/personalSlice';
import reservasSlice from './slices/reservasSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    discoteca: discotecaSlice,
    mesas: mesasSlice,
    eventos: eventosSlice,
    personal: personalSlice,
    reservas: reservasSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;