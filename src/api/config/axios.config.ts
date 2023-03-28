import axios from 'axios';

/**
 * Для авторизованных пользователей
 */
export const configAxiosAuth = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV,
  withCredentials: false,
  timeout: 60 * 1000,
  timeoutErrorMessage:
    'Превышено время ожидания ответа от сервера. Повторите попытку позже.',
  headers: {
    Authorization: `Bearer ${window.location?.search?.slice(1)}`,
  },
});
