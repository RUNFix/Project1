import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import postSlice from '../features/post/postSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
