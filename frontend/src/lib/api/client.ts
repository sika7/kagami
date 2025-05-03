// APIクライアントの基本設定

// 環境変数からAPIのベースURLを取得
// デフォルトはローカル開発環境のバックエンドAPI
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * カスタムエラーハンドリングのためのAPIエラークラス
 */
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * 標準的なフェッチラッパー
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // デフォルトのヘッダー
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    });
    
    // トークンがある場合は認証ヘッダーを追加
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    // リクエストオプションの設定
    const config: RequestInit = {
      ...options,
      headers,
    };
    
    // ステータスチェックとJSONレスポンスのハンドリング
    const response = await fetch(url, config);
    
    // JSONレスポンスを解析
    const data = await response.json();
    
    // エラーハンドリング
    if (!response.ok) {
      const errorMessage = data.message || 'APIリクエストエラー';
      throw new ApiError(response.status, errorMessage, data);
    }
    
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // ネットワークエラーや予期しないエラー
    throw new ApiError(
      0, 
      error instanceof Error ? error.message : 'ネットワークエラー',
      error
    );
  }
}

/**
 * GET リクエスト
 */
export function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST リクエスト
 */
export function post<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT リクエスト
 */
export function put<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE リクエスト
 */
export function del<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
}

// APIクライアントのエクスポート
const apiClient = {
  get,
  post,
  put,
  delete: del,
};

export default apiClient;