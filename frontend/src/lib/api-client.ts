import axios from 'axios';
import { getSession } from 'next-auth/react';
import { AuthenticationResponse, LoginRequest, RegisterRequest } from '@/types/api';

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

export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<AuthenticationResponse>('/auth/internal/login', {
      username: data.username,
      password: data.password
    }).then(response => response.data),

  register: (data: RegisterRequest) => 
    apiClient.post<AuthenticationResponse>('/auth/internal/register', {
      username: data.username,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth
    }),

  getUserProfile: () => 
    apiClient.get('/auth/profile').then(response => response.data),
};

export default apiClient;