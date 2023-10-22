import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  isLoading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    requestStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    requestSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    requestError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { requestStart, requestSuccess, requestError } = apiSlice.actions;

export default apiSlice.reducer;
