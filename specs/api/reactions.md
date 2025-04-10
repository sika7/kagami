# リアクションAPI仕様

## リアクション追加 (Add Reaction)
- **エンドポイント**: `POST /api/posts/{post_id}/reactions`
- **説明**: 投稿へのリアクションを追加
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
- **リクエスト**:
  ```json
  {
    "type": "string" // "like", "agree", "disagree" など
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "post_id": "integer",
    "type": "string",
    "created_at": "datetime"
  }
  ```

## リアクション削除 (Remove Reaction)
- **エンドポイント**: `DELETE /api/posts/{post_id}/reactions/{type}`
- **説明**: 投稿へのリアクションを削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
  - `type`: リアクションタイプ
- **レスポンス**:
  ```json
  {
    "message": "リアクションを削除しました"
  }
  ```

## リアクション一覧取得 (Get Reactions)
- **エンドポイント**: `GET /api/posts/{post_id}/reactions`
- **説明**: 投稿に対するリアクション一覧を取得
- **パラメータ**:
  - `post_id`: 投稿ID
  - `type`: リアクションタイプ（オプショナル）
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "type": "string",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "created_at": "datetime"
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

## ユーザーリアクション取得 (Get User Reaction)
- **エンドポイント**: `GET /api/posts/{post_id}/reactions/user`
- **説明**: ログインユーザーの投稿に対するリアクションを取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "type": "string",
    "created_at": "datetime"
  }
  ```

## リアクション集計 (Get Reaction Counts)
- **エンドポイント**: `GET /api/posts/{post_id}/reactions/counts`
- **説明**: 投稿に対するリアクション数の集計を取得
- **パラメータ**:
  - `post_id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "like": "integer",
    "agree": "integer",
    "disagree": "integer"
  }
  ```