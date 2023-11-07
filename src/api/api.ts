/* Api_key */
const API = import.meta.env.VITE_APP_API_URL;

/* AUTH LOGIN */
export const API_AUTH_REGISTER = API + 'auth/register';
export const API_AUTH_LOGIN = API + 'auth/login';
export const API_AUTH_REFRESH = API + 'auth/refresh';
export const API_AUTH_UPDATE = API + 'auth/update';

/* Employee */
export const API_EMPLOYEE = API + 'employee';
export const API_SEARCH_EMPLOYEE = API + 'employee/filter';

/* Vehicle */
export const API_VEHICLE = API + 'vehicle';

/* Repair */
export const API_REPAIR_EMPLOYEE = API + 'repair/employee';
export const API_REPAIR = API + 'repair';

export const API_BILL = API + 'bill';
