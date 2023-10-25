/* Api_key */
const API = import.meta.env.VITE_APP_API_URL;

/* AUTH LOGIN */
export const API_AUTH_REGISTER = API + 'auth/register';
export const API_AUTH_LOGIN = API + 'auth/login';
export const API_AUTH_REFRESH = API + 'auth/refresh';
export const API_AUTH_UPDATE = API + 'auth/update';

/* Employee */
export const API_EMPLOYEE = API + 'employee';

/* Vehicle */
export const API_VEHICLE = API + 'vehicle';

export const API_BILL = API + 'bill';
