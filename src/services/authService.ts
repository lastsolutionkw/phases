import { api } from './api';
import { User } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface RefreshResponse {
  access_token: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return api.post('/auth/login/', credentials);
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return api.post('/auth/register/', userData);
  },

  async refreshToken(): Promise<RefreshResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    return api.post('/auth/token/refresh/', { refresh_token: refreshToken });
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
      id: apiUser.id,
      email: apiUser.email,
      name: apiUser.name,
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
        this.setTokens(response.access_token, localStorage.getItem('refreshToken')!);
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