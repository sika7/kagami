import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * APIエラーからエラーメッセージを抽出する
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const errorData = error.response.data as ApiErrorResponse;
    if (errorData.message) {
      return errorData.message;
    }
    
    if (errorData.errors) {
      // 最初のエラーメッセージを返す
      const firstErrorKey = Object.keys(errorData.errors)[0];
      if (firstErrorKey && errorData.errors[firstErrorKey].length > 0) {
        return errorData.errors[firstErrorKey][0];
      }
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'エラーが発生しました。しばらく経ってからもう一度お試しください。';
}

/**
 * フォームエラーの形式に変換する
 * react-hook-formのsetErrorで使用可能な形式
 */
export function formatFormErrors(error: unknown): Record<string, { message: string }> {
  const formattedErrors: Record<string, { message: string }> = {};
  
  if (error instanceof AxiosError && error.response?.data) {
    const errorData = error.response.data as ApiErrorResponse;
    
    if (errorData.errors) {
      Object.entries(errorData.errors).forEach(([field, messages]) => {
        if (messages.length > 0) {
          formattedErrors[field] = { message: messages[0] };
        }
      });
    }
  }
  
  return formattedErrors;
}