'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  }>({});

  // 認証済みならホームにリダイレクト
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      passwordConfirmation?: string;
    } = {};
    let isValid = true;

    if (!name) {
      errors.name = '名前を入力してください';
      isValid = false;
    }

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
    } else if (password.length < 8) {
      errors.password = 'パスワードは8文字以上必要です';
      isValid = false;
    }

    if (!passwordConfirmation) {
      errors.passwordConfirmation = 'パスワード（確認）を入力してください';
      isValid = false;
    } else if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'パスワードが一致しません';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await register(name, email, password, passwordConfirmation);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-h1 font-semibold text-dark-blue mb-6 text-center">
          アカウント登録
        </h1>

        {error && (
          <div className="mb-6 p-3 bg-soft-coral/10 text-soft-coral rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="名前"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={formErrors.name}
            disabled={isLoading}
            isFullWidth
          />

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
            helperText="8文字以上で入力してください"
            error={formErrors.password}
            disabled={isLoading}
            isFullWidth
          />

          <Input
            label="パスワード（確認）"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={formErrors.passwordConfirmation}
            disabled={isLoading}
            isFullWidth
          />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            isFullWidth
          >
            登録
          </Button>

          <div className="text-center mt-4">
            <p className="text-dark-blue/70">
              すでにアカウントをお持ちの方は{' '}
              <Link
                href="/login"
                className="text-sky-blue hover:underline"
              >
                ログイン
              </Link>
              {' '}してください
            </p>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}