import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../services/movieService';
import authApi from '../services/authService';
import { favoriteApi } from '../services/favoriteService';
import { userSlice } from './userSlice';
import { modalSlice } from './modalSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      movieApi.middleware,
      authApi.middleware,
      favoriteApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
