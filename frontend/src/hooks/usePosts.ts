'use client';

import { useState, useCallback } from 'react';
import api, { Post, PostsParams } from '@/lib/api';

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  fetchPosts: (params?: PostsParams) => Promise<void>;
  getPost: (id: number | string) => Promise<Post | null>;
  createPost: (data: any) => Promise<Post | null>;
}

export function usePosts(initialPosts?: Post[]): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialPosts);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 投稿一覧を取得
  const fetchPosts = useCallback(async (params?: PostsParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.posts.getPosts({ 
        ...params, 
        page: params?.page || currentPage 
      });
      
      setPosts(response.data);
      setCurrentPage(response.meta.current_page);
      setTotalPages(response.meta.last_page);
      
      return response.data;
    } catch (err) {
      setError('投稿の読み込みに失敗しました');
      console.error('Failed to fetch posts:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  // 特定の投稿を取得
  const getPost = useCallback(async (id: number | string) => {
    setIsLoading(true);
    setError(null);

    try {
      const post = await api.posts.getPost(id);
      return post;
    } catch (err) {
      setError('投稿の読み込みに失敗しました');
      console.error(`Failed to fetch post ${id}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 新しい投稿を作成
  const createPost = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const newPost = await api.posts.createPost(data);
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError('投稿の作成に失敗しました');
      console.error('Failed to create post:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    posts,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchPosts,
    getPost,
    createPost,
  };
}

export default usePosts;