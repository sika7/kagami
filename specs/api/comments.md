# コメントAPI仕様

## コメント一覧取得 (List Comments)

- **エンドポイント**: `GET /api/posts/{post_id}/comments`
- **説明**: 投稿に対するコメント一覧取得
- **パラメータ**:
  - `post_id`: 投稿ID
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
  - `sort`: ソート順（新しい順、古い順、など）
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "content": "string",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "replies_count": "integer"
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

## コメント作成 (Create Comment)

- **エンドポイント**: `POST /api/posts/{post_id}/comments`
- **説明**: 投稿に対するコメント作成
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
- **リクエスト**:
  ```json
  {
    "content": "string",
    "parent_id": "integer|null"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "content": "string",
    "user_id": "integer",
    "post_id": "integer",
    "parent_id": "integer|null",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## コメント詳細取得 (Get Comment)

- **エンドポイント**: `GET /api/comments/{id}`
- **説明**: コメントの詳細取得
- **パラメータ**:
  - `id`: コメントID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "content": "string",
    "user": {
      "id": "integer",
      "name": "string",
      "avatar": "string"
    },
    "post_id": "integer",
    "parent_id": "integer|null",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## コメント更新 (Update Comment)

- **エンドポイント**: `PUT /api/comments/{id}`
- **説明**: コメントの更新
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: コメントID
- **リクエスト**:
  ```json
  {
    "content": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "content": "string",
    "user_id": "integer",
    "post_id": "integer",
    "parent_id": "integer|null",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## コメント削除 (Delete Comment)

- **エンドポイント**: `DELETE /api/comments/{id}`
- **説明**: コメントの削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: コメントID
- **レスポンス**:
  ```json
  {
    "message": "コメントを削除しました"
  }
  ```

## コメント返信一覧取得 (List Comment Replies)

- **エンドポイント**: `GET /api/comments/{id}/replies`
- **説明**: コメントに対する返信一覧取得
- **パラメータ**:
  - `id`: コメントID
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "content": "string",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "created_at": "datetime",
        "updated_at": "datetime"
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

