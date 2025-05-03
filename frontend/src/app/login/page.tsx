'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  // 認証済みならホームにリダイレクト
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      errors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    if (!password) {
      errors.password = 'パスワードを入力してください';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await login(email, password);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-h1 font-semibold text-dark-blue mb-6 text-center">
          ログイン
        </h1>

        {error && (
          <div className="mb-6 p-3 bg-soft-coral/10 text-soft-coral rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={formErrors.email}
            disabled={isLoading}
            isFullWidth
          />

          <Input
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            disabled={isLoading}
            isFullWidth
          />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            isFullWidth
          >
            ログイン
          </Button>

          <div className="text-center mt-4">
            <p className="text-dark-blue/70">
              アカウントをお持ちでない方は{' '}
              <Link
                href="/register"
                className="text-sky-blue hover:underline"
              >
                登録
              </Link>
              {' '}してください
            </p>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}