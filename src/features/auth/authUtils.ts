import { AppDispatch } from 'src/store';
import { setAccessToken, setRefreshToken } from './authSlice';

export const loadTokensFromSession = () => {
  return (dispatch: AppDispatch) => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
    if (refreshToken) {
      dispatch(setRefreshToken(refreshToken));
    }
  };
};

export const TokenExists = (): boolean => {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  return Boolean(accessToken || refreshToken);
};

