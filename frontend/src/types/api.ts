export interface LoginRequest {
  username: string;
  password: string;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

export interface User {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticationResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}