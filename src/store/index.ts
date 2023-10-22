import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
// Define AppThunk type
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
