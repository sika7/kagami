// APIエンドポイントの定義

export const API_ENDPOINTS = {
  // 認証関連
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  
  // 投稿関連
  POSTS: {
    BASE: '/posts',
    DETAIL: (id: number | string) => `/posts/${id}`,
    RELATIONSHIPS: (id: number | string) => `/posts/${id}/relationships`,
    TREE: (id: number | string) => `/posts/${id}/tree`,
  },
  
  // ユーザー関連
  USERS: {
    BASE: '/users',
    DETAIL: (id: number | string) => `/users/${id}`,
    POSTS: (id: number | string) => `/users/${id}/posts`,
  },
};

export default API_ENDPOINTS;