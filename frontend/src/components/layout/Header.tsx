'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-light py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/" className="text-dark-blue font-semibold text-xl">
          SNS Platform
        </Link>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden text-dark-blue"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-dark-blue hover:text-sky-blue">
            ホーム
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/posts/create" className="text-dark-blue hover:text-sky-blue">
                投稿する
              </Link>
              <div className="relative group">
                <button className="flex items-center text-dark-blue hover:text-sky-blue focus:outline-none">
                  <span className="mr-1">{user?.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-normal z-10">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-dark-blue hover:bg-light-grey"
                    >
                      プロフィール
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-dark-blue hover:bg-light-grey"
                    >
                      設定
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-dark-blue hover:bg-light-grey"
                    >
                      ログアウト
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-dark-blue hover:text-sky-blue"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="bg-sky-blue hover:bg-[#2980b9] text-white px-4 py-2 rounded-md transition-colors duration-fast"
              >
                登録
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-dark-blue hover:text-sky-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/posts/create"
                  className="text-dark-blue hover:text-sky-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  投稿する
                </Link>
                <Link
                  href="/profile"
                  className="text-dark-blue hover:text-sky-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  プロフィール
                </Link>
                <Link
                  href="/settings"
                  className="text-dark-blue hover:text-sky-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  設定
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-dark-blue hover:text-sky-blue"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-dark-blue hover:text-sky-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="inline-block bg-sky-blue hover:bg-[#2980b9] text-white px-4 py-2 rounded-md transition-colors duration-fast"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登録
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;