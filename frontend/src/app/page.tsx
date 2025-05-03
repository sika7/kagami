import MainLayout from '@/components/layout/MainLayout';
import PostList from '@/components/posts/PostList';

export default function Home() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-dark-blue mb-4">最新の投稿</h1>
        <p className="text-dark-blue/70">
          論理構造を活用した情報共有プラットフォームへようこそ。最新の投稿を確認できます。
        </p>
      </div>
      
      <PostList />
    </MainLayout>
  );
}
