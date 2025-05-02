import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getCurrentUser, 
  login as loginApi, 
  logout as logoutApi, 
  register as registerApi,
  type User, 
  type LoginParams, 
  type RegisterParams 
} from '../api/auth';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '~/utils/storage';
import { isBrowser } from '~/utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (params: LoginParams) => Promise<User>;
  register: (params: RegisterParams) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * ローカルストレージからユーザー情報を取得する
 */
const getUserFromStorage = (): User | null => {
  if (!isBrowser()) return null;
  
  try {
    const userJson = getLocalStorage('auth_user');
    return userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    console.error('Error parsing user from storage:', e);
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 初期状態としてローカルストレージから直接ユーザー情報を取得
  const [user, setUser] = useState<User | null>(getUserFromStorage());
  const queryClient = useQueryClient();

  // ブラウザの場合のみトークンチェック
  const hasToken = isBrowser() ? !!getLocalStorage('auth_token') : false;

  // 現在のユーザー情報を取得するクエリ
  const { data: userData, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    // Tokenがある場合かつブラウザ環境でのみ実行
    enabled: hasToken,
    retry: 1,
    staleTime: 1000 * 60, // 1分間はキャッシュを使用
    onSuccess: (fetchedUser) => {
      // APIから取得したユーザー情報を保存
      setUser(fetchedUser);
      if (isBrowser()) {
        setLocalStorage('auth_user', JSON.stringify(fetchedUser));
      }
    },
    onError: () => {
      // エラー時は認証情報をクリア
      if (isBrowser()) {
        removeLocalStorage('auth_token');
        removeLocalStorage('auth_user');
      }
      setUser(null);
    }
  });

  // ログイン処理
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      if (isBrowser()) {
        setLocalStorage('auth_user', JSON.stringify(data.user));
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  // 登録処理
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setUser(data.user);
      if (isBrowser()) {
        setLocalStorage('auth_user', JSON.stringify(data.user));
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  // ログアウト処理
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUser(null);
      if (isBrowser()) {
        removeLocalStorage('auth_user');
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  // ログイン関数
  const login = async (params: LoginParams) => {
    const result = await loginMutation.mutateAsync(params);
    return result.user;
  };

  // 登録関数
  const register = async (params: RegisterParams) => {
    const result = await registerMutation.mutateAsync(params);
    return result.user;
  };

  // ログアウト関数
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // コンテキスト値
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// カスタムフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}