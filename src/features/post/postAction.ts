import axios from 'axios';
import { AppThunk, RootState } from 'src/store/index';
import { requestStart, requestSuccess, requestError } from '../post/postSlice';
import { refreshToken } from '../auth/authActions';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Inside postAction.ts (or wherever you define getResource)

export const getResource = createAsyncThunk(
  'post/getResource',
  async (apiEndpoint: string, { getState, dispatch }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === 'TokenExpiredError'
      ) {
        await dispatch(refreshToken());
        return await dispatch(getResource(apiEndpoint)); // Retry after refreshing
      }

      throw error; // For other errors, re-throw them
    }
  },
);

export const postResource =
  (url: string, data: any): AppThunk =>
  async (dispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.post(url, data);
      dispatch(requestSuccess(response.data));
    } catch (error) {
      dispatch(requestError(error.toString()));
    }
  };

export const putResource =
  (url: string, data: any): AppThunk =>
  async (dispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.put(url, data);
      dispatch(requestSuccess(response.data));
    } catch (error) {
      dispatch(requestError(error.toString()));
    }
  };

export const deleteResource =
  (url: string, data: any): AppThunk =>
  async (dispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.put(url, data);
      dispatch(requestSuccess(response.data));
    } catch (error) {
      dispatch(requestError(error.toString()));
    }
  };

export const patchResource =
  (url: string, data: any): AppThunk =>
  async (dispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.put(url, data);
      dispatch(requestSuccess(response.data));
    } catch (error) {
      dispatch(requestError(error.toString()));
    }
  };
