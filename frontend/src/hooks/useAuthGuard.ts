'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * 認証状態に基づいてページアクセスを制御するためのフック
 * @param options.redirectTo リダイレクト先のパス
 * @param options.requireAuth true: 認証が必要、false: 非認証が必要
 */
export function useAuthGuard({
  redirectTo = '/login',
  requireAuth = true,
}: UseAuthGuardOptions = {}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ローディング中は何もしない
    if (isLoading) {
      return;
    }

    // 認証が必要なのに認証されていない場合
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }

    // 認証されているのに非認証ページにアクセスした場合（例：ログインページ）
    if (!requireAuth && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, redirectTo, requireAuth, router]);

  return { isLoading, isAuthenticated };
}

export default useAuthGuard;