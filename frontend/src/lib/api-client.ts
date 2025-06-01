import axios from 'axios';
import { getSession } from 'next-auth/react';
import { LoginRequest, LoginResponse } from '@/types/api';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    // Only in browser context
    if (typeof window !== 'undefined') {
      const session = await getSession();
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<LoginResponse>('/auth/login', {
      username: data.username,
      password: data.password
    }).then(response => response.data),

  register: (data: RegisterRequest) => 
    apiClient.post<void>('/auth/register', {
      username: data.username,
      email: data.email,
      password: data.password
    }),

  getUserProfile: () => 
    apiClient.get('/auth/profile').then(response => response.data),
};

export default apiClient;