/**
 * ブラウザ環境かどうかを判定
 */
export const isBrowser = () => typeof window !== "undefined";

/**
 * localStorageから値を取得
 */
export const getLocalStorage = (key: string): string | null => {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * localStorageに値を保存
 */
export const setLocalStorage = (key: string, value: string): void => {
  if (isBrowser()) {
    localStorage.setItem(key, value);
  }
};

/**
 * localStorageから値を削除
 */
export const removeLocalStorage = (key: string): void => {
  if (isBrowser()) {
    localStorage.removeItem(key);
  }
};