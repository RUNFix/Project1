import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_AUTH_LOGIN, API_AUTH_REFRESH } from 'src/api/api';
import { RootState } from 'src/store/rootReducer';
import { setAccessToken } from './authSlice';

// Thunk para iniciar sesión
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { cc: string; password: string }) => {
    const response = await axios.post(API_AUTH_LOGIN, credentials);
    return response.data;
  },
);

// Thunk para refrescar el token
// Inside authSlice.ts

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, dispatch }) => {
    const refreshToken = (getState() as RootState).auth.refreshToken;
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    try {
      const response = await axios.post(API_AUTH_REFRESH, {
        refreshToken: refreshToken,
      });

      dispatch(setAccessToken(response.data.accessToken.token));
    } catch (error) {
      console.error('Error refreshing the access token:', error);
      throw new Error('Failed to refresh token');
    }
  },
);
