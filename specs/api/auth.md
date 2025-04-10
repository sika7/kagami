# 認証API仕様

## 登録 (Register)
- **エンドポイント**: `POST /api/auth/register`
- **説明**: 新規ユーザー登録
- **リクエスト**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "password_confirmation": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "user": {
      "id": "integer",
      "name": "string",
      "email": "string",
      "created_at": "datetime",
      "updated_at": "datetime"
    },
    "token": "string"
  }
  ```

## ログイン (Login)
- **エンドポイント**: `POST /api/auth/login`
- **説明**: ユーザーログイン
- **リクエスト**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "user": {
      "id": "integer",
      "name": "string",
      "email": "string",
      "created_at": "datetime",
      "updated_at": "datetime"
    },
    "token": "string"
  }
  ```

## ログアウト (Logout)
- **エンドポイント**: `POST /api/auth/logout`
- **説明**: ユーザーログアウト
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "message": "ログアウトしました"
  }
  ```

## ユーザー情報取得 (Get User)
- **エンドポイント**: `GET /api/auth/user`
- **説明**: ログイン中ユーザーの情報取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "email": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## メール認証 (Email Verification)
- **エンドポイント**: `POST /api/auth/email/verify/{id}`
- **説明**: メールアドレスの認証
- **パラメータ**:
  - `id`: 認証ID
  - `hash`: 認証ハッシュ
  - `signature`: 署名
- **レスポンス**:
  ```json
  {
    "message": "メールアドレスが認証されました"
  }
  ```

## パスワードリセット要求 (Password Reset Request)
- **エンドポイント**: `POST /api/auth/password/email`
- **説明**: パスワードリセットメール送信
- **リクエスト**:
  ```json
  {
    "email": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "message": "パスワードリセットメールを送信しました"
  }
  ```

## パスワードリセット (Password Reset)
- **エンドポイント**: `POST /api/auth/password/reset`
- **説明**: パスワードのリセット処理
- **リクエスト**:
  ```json
  {
    "email": "string",
    "password": "string",
    "password_confirmation": "string",
    "token": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "message": "パスワードがリセットされました"
  }
  ```