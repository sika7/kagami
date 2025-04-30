import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

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
    const token = localStorage.getItem('auth_token');
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
    // 401エラー（認証エラー）の場合
    if (error.response && error.response.status === 401) {
      // トークンを削除
      localStorage.removeItem('auth_token');
      // ログインページにリダイレクト（実装予定）
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;