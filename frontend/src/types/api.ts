export interface LoginRequest {
  username: string;
  password: string;
}

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

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}