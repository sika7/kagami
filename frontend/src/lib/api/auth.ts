// 認証関連のAPI呼び出し

import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

// レスポンスの型定義
export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

// 認証関連のAPIインターフェース
export const authApi = {
  /**
   * ユーザー登録
   */
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * ログイン
   */
  login: (data: { email: string; password: string }) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  /**
   * 現在のユーザー情報を取得
   */
  getCurrentUser: () => {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  /**
   * ログイン状態の確認
   */
  checkAuth: async (): Promise<boolean> => {
    try {
      // トークンの存在確認
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return false;
      }

      // APIでユーザー情報を取得して検証
      await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
      return true;
    } catch (error) {
      // エラーの場合は未認証
      return false;
    }
  },

  /**
   * ログアウト (クライアントサイドのみ)
   */
  logout: () => {
    localStorage.removeItem('auth_token');
  },
};

export default authApi;