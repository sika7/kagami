'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';
import { formatDate, truncateText } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // 投稿タイプに応じたカラークラスを取得
  const getTypeColorClass = (type: string) => {
    switch (type) {
      case 'problem':
        return 'bg-problem text-white';
      case 'solution':
        return 'bg-solution text-white';
      case 'supplement':
        return 'bg-supplement text-white';
      default:
        return 'bg-dark-blue text-white';
    }
  };

  // 投稿タイプの日本語表記を取得
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'problem':
        return '問題提示';
      case 'solution':
        return '解決策提示';
      case 'supplement':
        return '補足';
      default:
        return type;
    }
  };

  return (
    <Card isHoverable>
      <div className="flex flex-col h-full">
        {/* 投稿タイプとメタ情報 */}
        <div className="flex justify-between items-start mb-3">
          <span
            className={`${getTypeColorClass(
              post.type
            )} px-2 py-1 rounded-md text-xs font-medium`}
          >
            {getTypeLabel(post.type)}
          </span>
          <div className="text-dark-blue/60 text-xs">
            {formatDate(post.created_at, { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* 主張（タイトル） */}
        <Link href={`/posts/${post.id}`}>
          <h3 className="text-h3 font-medium text-dark-blue hover:text-sky-blue mb-2">
            {truncateText(post.claim, 100)}
          </h3>
        </Link>

        {/* 投稿者情報 */}
        {post.user && (
          <div className="mt-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-light-grey flex items-center justify-center text-dark-blue font-medium">
              {post.user.name.charAt(0)}
            </div>
            <div className="ml-2">
              <Link
                href={`/users/${post.user.id}`}
                className="text-dark-blue hover:text-sky-blue text-sm font-medium"
              >
                {post.user.name}
              </Link>
            </div>
          </div>
        )}

        {/* 子投稿の数など関連情報があれば表示 */}
        {/* APIでこの情報が提供される場合に実装 */}
      </div>
    </Card>
  );
};

export default PostCard;