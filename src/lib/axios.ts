import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ApiErrorResponse } from "@/types/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:6000/api/v1";

export const TOKEN_STORAGE_KEY = "pureyuna_token";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    return Promise.reject(error);
  }
);

export const apiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.get(url, config);
  return response.data as T;
};

export const apiPost = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.post(url, data, config);
  return response.data as T;
};

export const apiPatch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.patch(url, data, config);
  return response.data as T;
};

export const apiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.delete(url, config);
  return response.data as T;
};

export default axiosInstance;