import apiClient from './client';

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

/**
 * ユーザー登録
 */
export const register = async (data: RegisterParams): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * ログイン
 */
export const login = async (data: LoginParams): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * ログインユーザー情報の取得
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * ログアウト
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};