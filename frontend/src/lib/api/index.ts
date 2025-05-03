// API関連のエクスポート

import apiClient, { ApiError } from './client';
import { API_ENDPOINTS } from './endpoints';
import authApi from './auth';
import postsApi from './posts';

// 型定義のエクスポート
export * from './auth';
export * from './posts';
export { ApiError };

// APIクライアントのエクスポート
const api = {
  client: apiClient,
  endpoints: API_ENDPOINTS,
  auth: authApi,
  posts: postsApi,
};

export default api;