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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (params: LoginParams) => Promise<User>;
  register: (params: RegisterParams) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // 現在のユーザー情報を取得するクエリ
  const { data: userData, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    // Tokenがない場合はリクエストしない
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
    onError: () => {
      // エラー時は認証情報をクリア
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  });

  // ユーザーデータが変更されたらステートを更新
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  // ログイン処理
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  // 登録処理
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  // ログアウト処理
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUser(null);
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