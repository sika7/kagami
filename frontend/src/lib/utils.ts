import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// クラス名を結合する関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ブレークポイントのヘルパー関数
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

// メディアクエリのヘルパー関数
export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerWidth >= breakpoints[breakpoint];
}

// 日付フォーマット関数
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ja-JP', options || defaultOptions).format(dateObj);
}

// テキスト省略関数
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}

// ランダムID生成関数
export function generateId(prefix = '') {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}