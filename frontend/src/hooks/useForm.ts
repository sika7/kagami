'use client';

import { useState, useCallback } from 'react';

interface FormValidators<T> {
  [key: string]: (value: any, values: T) => string | undefined;
}

/**
 * フォーム管理のためのカスタムフック
 * @param initialValues フォームの初期値
 * @param validators バリデーション関数のオブジェクト
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validators: FormValidators<T> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // フィールド値の更新
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // バリデーション
      if (validators[name]) {
        const error = validators[name](value, values);
        setErrors((prev) => ({ ...prev, [name]: error || '' }));
      }
    },
    [validators, values]
  );

  // フィールドがフォーカスを失った時
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      
      // バリデーション
      if (validators[name]) {
        const error = validators[name](values[name], values);
        setErrors((prev) => ({ ...prev, [name]: error || '' }));
      }
    },
    [validators, values]
  );

  // フォーム全体のバリデーション
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // すべてのフィールドをタッチ済みとしてマーク
    const newTouched: Record<string, boolean> = {};
    Object.keys(values).forEach((key) => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    // すべてのバリデーターを実行
    Object.entries(validators).forEach(([field, validator]) => {
      const error = validator(values[field], values);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validators, values]);

  // フォームのリセット
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // フィールド値を直接設定
  const setValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // バリデーション
    if (validators[name]) {
      const error = validators[name](value, values);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    }
  }, [validators, values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValue,
  };
}

export default useForm;