import axios from 'axios';
import { API_AUTH_REFRESH } from 'src/api/api';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from 'src/utils/Token';

//const navegar = useNavigate();

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.message === 'TokenExpiredError' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(API_AUTH_REFRESH, { refreshToken });
          setAccessToken(data.accessToken.token);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + data.accessToken.token;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // handle the error, possibly redirect to login
          //navegar('/login');
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
