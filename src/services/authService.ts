import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export class AuthService {
  private static TOKEN_KEY = 'nba_store_token';
  private static USER_KEY = 'nba_store_user';

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      if (data.access_token) {
        localStorage.setItem(this.TOKEN_KEY, data.access_token);
        // Guardar token de admin si corresponde
        localStorage.setItem('adminToken', data.access_token);
      }
      if (data.user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      // Store token and user data
      if (data.access_token) {
        localStorage.setItem(this.TOKEN_KEY, data.access_token);
      }
      if (data.user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const user = this.getUser();
      if (user) {
        const response = await fetch(API_ENDPOINTS.USER_BY_ID(user.id), {
          headers: getAuthHeaders(token),
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
          return userData;
        }
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
}