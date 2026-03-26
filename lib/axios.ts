import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { PUBLIC_ROUTES, STORAGE_KEYS } from "./constants";

// ─── Axios Instance ──────────────────────────────────────
const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_ROUTE!,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor ─────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get(STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 500) {
      console.error("Server Error");
    }

    return Promise.reject(error);
  },
);

// ─── Type-safe Helpers ───────────────────────────────────
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await axiosInstance.get<T>(url, config);
  return data;
}

export async function apiPost<T, D = unknown>(
  url: string,
  payload?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await axiosInstance.post<T>(url, payload, config);
  return data;
}

export async function apiPut<T, D = unknown>(
  url: string,
  payload?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await axiosInstance.put<T>(url, payload, config);
  return data;
}

export async function apiPatch<T, D = unknown>(
  url: string,
  payload?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await axiosInstance.patch<T>(url, payload, config);
  return data;
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await axiosInstance.delete<T>(url, config);
  return data;
}

export default axiosInstance;
