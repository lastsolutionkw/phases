import { api } from './api';
import { User } from '@/types';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  age: number;
  gender: 'male' | 'female' | 'prefer_not_to_say';
  country: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    date_joined: string;
  };
  secure_user_id: string;
  refresh: string;
  access: string;
}

export interface RefreshResponse {
  access: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login/', credentials);
    this.setTokens(response.access, response.refresh);
    return response;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register/', userData);
    this.setTokens(response.access, response.refresh);
    return response;
  },

  async refreshToken(): Promise<RefreshResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    return api.post('/auth/token/refresh/', { refresh: refreshToken });
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile/');
    return this.transformUserFromAPI(response);
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile/', userData);
    return this.transformUserFromAPI(response);
  },

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  transformUserFromAPI(apiUser: any): User {
    return {
      id: apiUser.id.toString(),
      email: apiUser.email,
      name: apiUser.first_name && apiUser.last_name ? `${apiUser.first_name} ${apiUser.last_name}` : apiUser.username,
      isGuest: false,
      preferences: {
        language: apiUser.preferences?.language || 'en',
        theme: apiUser.preferences?.theme || 'light',
      },
    };
  },

  async handleAuthError(error: any) {
    if (error.status === 401) {
      try {
        const response = await this.refreshToken();
        this.setTokens(response.access, localStorage.getItem('refreshToken')!);
        return true;
      } catch (refreshError) {
        this.clearTokens();
        window.location.href = '/auth/login';
        return false;
      }
    }
    return false;
  },
};