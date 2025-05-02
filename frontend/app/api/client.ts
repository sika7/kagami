import axios from 'axios';
import { getLocalStorage } from '~/utils/storage';

// ブラウザ環境で安全に使える形でAPIのURLを定義
// Remixの環境変数アクセスはサーバーサイドでのみ機能するので、
// ここではハードコードされた値を使用
const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // CORSリクエストにクッキーを含める
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    // トークンがローカルストレージにある場合はヘッダーに追加
    const token = getLocalStorage('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // エラー処理
    return Promise.reject(error);
  }
);

export default apiClient;