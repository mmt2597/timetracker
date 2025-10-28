export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role?: 'admin' | 'employee';
  created_at: string;
  updated_at: string;
  employee?: {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface UserResponse {
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
