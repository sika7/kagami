'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-grey py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div>
            <h3 className="text-dark-blue font-semibold text-lg mb-4">
              SNS Platform
            </h3>
            <p className="text-dark-blue/70 text-sm">
              論理構造を活用した情報共有プラットフォーム
            </p>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-dark-blue font-medium mb-4">リンク</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  理念
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h4 className="text-dark-blue font-medium mb-4">法的情報</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-dark-blue/70 hover:text-sky-blue text-sm"
                >
                  クッキーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-6 border-t border-dark-blue/10 text-center">
          <p className="text-dark-blue/60 text-xs">
            &copy; {currentYear} SNS Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;