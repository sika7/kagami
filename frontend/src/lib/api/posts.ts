// 投稿関連のAPI呼び出し

import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

// 投稿の型定義
export interface Post {
  id: number;
  user_id: number;
  type: 'problem' | 'solution' | 'supplement'; // フェーズ0では3種類のみ
  claim: string;
  evidence: string;
  reasoning: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
  };
}

// 一覧取得時のレスポンス型
export interface PostsResponse {
  data: Post[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// 投稿間の関係を取得するレスポンス型
export interface RelationshipsResponse {
  parent: Post | null;
  children: Post[];
}

// 投稿の一覧取得パラメータ型
export interface PostsParams {
  page?: number;
  per_page?: number;
  type?: 'problem' | 'solution' | 'supplement';
}

// 投稿作成パラメータ型
export interface CreatePostData {
  type: 'problem' | 'solution' | 'supplement';
  claim: string;
  evidence: string;
  reasoning: string;
  parent_id?: number | null;
}

// 投稿関連のAPIインターフェース
export const postsApi = {
  /**
   * 投稿一覧の取得
   */
  getPosts: (params?: PostsParams) => {
    // クエリパラメータの構築
    const queryParams = new URLSearchParams();
    
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    
    if (params?.per_page) {
      queryParams.append('per_page', params.per_page.toString());
    }
    
    if (params?.type) {
      queryParams.append('type', params.type);
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return apiClient.get<PostsResponse>(`${API_ENDPOINTS.POSTS.BASE}${queryString}`);
  },

  /**
   * 投稿詳細の取得
   */
  getPost: (id: number | string) => {
    return apiClient.get<Post>(API_ENDPOINTS.POSTS.DETAIL(id));
  },

  /**
   * 投稿間の関係の取得
   */
  getRelationships: (id: number | string) => {
    return apiClient.get<RelationshipsResponse>(API_ENDPOINTS.POSTS.RELATIONSHIPS(id));
  },

  /**
   * 投稿の作成
   */
  createPost: (data: CreatePostData) => {
    return apiClient.post<Post>(API_ENDPOINTS.POSTS.BASE, data);
  },

  /**
   * 投稿ツリーの取得
   */
  getPostTree: (id: number | string, depth: number = 3) => {
    const queryParams = new URLSearchParams({ depth: depth.toString() });
    return apiClient.get<any>(`${API_ENDPOINTS.POSTS.TREE(id)}?${queryParams.toString()}`);
  },
};

export default postsApi;