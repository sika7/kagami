import { QueryClient } from '@tanstack/react-query';

// React Queryのクライアント設定
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分間はデータをstaleとみなさない
      retry: 1, // エラー時の再試行回数
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の再取得を無効化
    },
    mutations: {
      retry: 1, // 変更操作の再試行回数
    },
  },
});