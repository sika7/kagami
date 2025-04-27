# ユーザーAPI仕様

## ユーザープロフィール取得 (Get Profile)

- **エンドポイント**: `GET /api/users/{id}/profile`
- **説明**: 特定ユーザーのプロフィール情報取得
- **パラメータ**:
  - `id`: ユーザーID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "bio": "string",
    "avatar": "string",
    "created_at": "datetime",
    "updated_at": "datetime",
    "followers_count": "integer",
    "following_count": "integer"
  }
  ```

## ユーザープロフィール更新 (Update Profile)

- **エンドポイント**: `PUT /api/users/profile`
- **説明**: ログイン中ユーザーのプロフィール情報更新
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```json
  {
    "name": "string",
    "bio": "string",
    "avatar": "file"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "bio": "string",
    "avatar": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## ユーザーフォロー (Follow User)

- **エンドポイント**: `POST /api/users/{id}/follow`
- **説明**: 特定ユーザーをフォローする
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: フォローするユーザーID
- **レスポンス**:
  ```json
  {
    "message": "ユーザーをフォローしました"
  }
  ```

## ユーザーアンフォロー (Unfollow User)

- **エンドポイント**: `DELETE /api/users/{id}/follow`
- **説明**: 特定ユーザーのフォローを解除する
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: アンフォローするユーザーID
- **レスポンス**:
  ```json
  {
    "message": "フォローを解除しました"
  }
  ```

## フォロワー一覧取得 (Get Followers)

- **エンドポイント**: `GET /api/users/{id}/followers`
- **説明**: 特定ユーザーのフォロワー一覧取得
- **パラメータ**:
  - `id`: ユーザーID
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "name": "string",
        "avatar": "string"
      }
    ],
    "meta": {
      "current_page": "integer",
      "last_page": "integer",
      "per_page": "integer",
      "total": "integer"
    }
  }
  ```

## フォロー中ユーザー一覧取得 (Get Following)

- **エンドポイント**: `GET /api/users/{id}/following`
- **説明**: 特定ユーザーがフォロー中のユーザー一覧取得
- **パラメータ**:
  - `id`: ユーザーID
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "name": "string",
        "avatar": "string"
      }
    ],
    "meta": {
      "current_page": "integer",
      "last_page": "integer",
      "per_page": "integer",
      "total": "integer"
    }
  }
  ```
