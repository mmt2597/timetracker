import { api } from '~/lib/api';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  UserResponse,
} from '~/types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/logout');
    return response.data;
  },

  getUser: async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/user');
    return response.data;
  },
};
