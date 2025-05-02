import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useAuth } from "~/contexts/auth-context";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "SNSプラットフォーム - ホーム" },
    { name: "description", content: "論理的な議論のためのSNSプラットフォーム" },
  ];
};

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">論理の共創のための</span>{" "}
              <span className="block text-blue-600 xl:inline">SNSプラットフォーム</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              論理的な議論を通じて、共に知識を構築し、理解を深めるためのプラットフォームです。
            </p>
            
            {isAuthenticated ? (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800">
                  ようこそ、{user?.name}さん
                </h2>
                <p className="mt-4 text-gray-600">
                  現在開発中のプラットフォームへようこそ。フィードバックをお待ちしています。
                </p>
                <div className="mt-8">
                  <Link
                    to="/posts"
                    className="inline-block rounded-md border border-transparent bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-blue-700"
                  >
                    投稿を見る
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/register"
                    className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:px-8"
                  >
                    アカウント登録
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:px-8"
                  >
                    ログイン
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}