import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { configAxiosAuth } from './config/axios.config';

export const axiosInstance = {
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return configAxiosAuth.request(config);
  },

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return configAxiosAuth.get<T, R>(url, config);
  },

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return configAxiosAuth.post<T, R>(url, data, config);
  },

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return configAxiosAuth.put<T, R>(url, data, config);
  },

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return configAxiosAuth.delete<T, R>(url, config);
  },
};
