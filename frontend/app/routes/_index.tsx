import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useAuth } from "~/contexts/auth-context";
import Header from "~/components/Header";
import Button from "~/components/Button";

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
      <main className="flex-1 bg-light-grey">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-h1 font-semibold tracking-tight text-dark-blue sm:text-5xl md:text-6xl">
              <span className="block xl:inline">論理の共創のための</span>{" "}
              <span className="block text-sky-blue xl:inline">SNSプラットフォーム</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-body text-dark-blue/70 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              論理的な議論を通じて、共に知識を構築し、理解を深めるためのプラットフォームです。
            </p>
            
            {isAuthenticated ? (
              <div className="mt-10">
                <h2 className="text-h2 font-semibold text-dark-blue">
                  ようこそ、{user?.name}さん
                </h2>
                <p className="mt-4 text-body text-dark-blue/70">
                  現在開発中のプラットフォームへようこそ。フィードバックをお待ちしています。
                </p>
                <div className="mt-8">
                  <Button
                    as="link"
                    to="/posts"
                    variant="primary"
                  >
                    投稿を見る
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Button
                    as="link"
                    to="/register"
                    variant="primary"
                    className="sm:px-8"
                  >
                    アカウント登録
                  </Button>
                  <Button
                    as="link"
                    to="/login"
                    variant="secondary"
                    className="sm:px-8"
                  >
                    ログイン
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}