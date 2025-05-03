'use client';

import React, { useState, useEffect } from 'react';
import { Post, postsApi, PostsParams } from '@/lib/api';
import PostCard from './PostCard';
import Grid from '@/components/ui/Grid';

interface PostListProps {
  initialPosts?: Post[];
  filters?: PostsParams;
}

const PostList: React.FC<PostListProps> = ({ initialPosts, filters }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialPosts);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPosts = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postsApi.getPosts({
        ...filters,
        page,
        per_page: 12,
      });
      
      setPosts(response.data);
      setCurrentPage(response.meta.current_page);
      setTotalPages(response.meta.last_page);
    } catch (err) {
      setError('投稿の読み込みに失敗しました。');
      console.error('Failed to load posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初期データがない場合はAPIから取得
  useEffect(() => {
    if (!initialPosts) {
      fetchPosts();
    }
  }, [initialPosts, filters]);

  // ページ変更時のハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(page);
    // ページの上部にスクロール
    window.scrollTo(0, 0);
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
      </div>
    );
  }

  // エラー時の表示
  if (error) {
    return (
      <div className="bg-soft-coral/10 text-soft-coral p-4 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => fetchPosts(currentPage)}
          className="mt-2 text-sm font-medium underline"
        >
          再読み込み
        </button>
      </div>
    );
  }

  // 投稿がない場合の表示
  if (posts.length === 0) {
    return (
      <div className="bg-light-grey p-8 rounded-md text-center">
        <h3 className="text-dark-blue font-medium text-lg mb-2">
          投稿がありません
        </h3>
        <p className="text-dark-blue/70">
          この条件に一致する投稿はまだありません。
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 投稿リスト */}
      <Grid
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap="md"
        className="mb-8"
      >
        {posts.map((post) => (
          <Grid.Item key={post.id}>
            <PostCard post={post} />
          </Grid.Item>
        ))}
      </Grid>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {/* 前のページボタン */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-light-grey text-dark-blue/40 cursor-not-allowed'
                  : 'bg-white text-dark-blue hover:bg-sky-blue hover:text-white'
              }`}
            >
              前へ
            </button>

            {/* ページ番号ボタン */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => {
                // 省略記号の表示
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <span
                      key={`ellipsis-${page}`}
                      className="px-3 py-2 text-dark-blue"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === page
                        ? 'bg-sky-blue text-white'
                        : 'bg-white text-dark-blue hover:bg-sky-blue/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

            {/* 次のページボタン */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-light-grey text-dark-blue/40 cursor-not-allowed'
                  : 'bg-white text-dark-blue hover:bg-sky-blue hover:text-white'
              }`}
            >
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;