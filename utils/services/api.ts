import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "./auth";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Our NestJS server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  token?: string;
  user?: any;
}

// Generic API request function
export const apiRequest = async <T = any, R = ApiResponse<T>>(
  method: string,
  url: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<R> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      ...options,
    };

    if (data) {
      if (method.toLowerCase() === "get") {
        config.params = data;
      } else {
        config.data = data;
      }
    }

    const response: AxiosResponse<R> = await api(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data as R;
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        message:
          "No response from server. Please check your internet connection.",
      } as R;
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      } as R;
    }
  }
};

// Auth API endpoints
export const authApi = {
  // Login with email and password
  login: (email: string, password: string) =>
    apiRequest<{ token: string; user: any }>("post", "/auth/login", {
      email,
      password,
    }),

  // Register a new user
  signup: (
    fullName: string,
    email: string,
    password: string,
    userType: string
  ) =>
    apiRequest<{ token: string; user: any }>("post", "/auth/signup", {
      fullName,
      email,
      password,
      userType,
    }),

  // Get current user profile
  getCurrentUser: () => apiRequest<{ user: any }>("get", "/auth/me"),
};

export default api;
