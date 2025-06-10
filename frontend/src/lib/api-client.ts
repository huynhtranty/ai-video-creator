import axios from 'axios';
import { LoginRequest, LoginResponse } from '@/types/api';
import { create } from 'domain';
import { ListProject } from '@/features/listProject/api/listProject';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

    dashboard: (data: LoginRequest) => {
      apiClient.post<LoginResponse>('/auth/dashboard', {
            username: data.username,
            password: data.password
        }).then(response => response.data)
    },
    createVideo: (data: FormData) =>
    apiClient.post<void>('/auth/createVideo', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    ListProject: (data: LoginRequest) => 
    apiClient.post<void>('/auth/listProject', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

};

export default apiClient;