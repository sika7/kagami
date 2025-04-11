# ブックマークAPI仕様

## ブックマーク作成 (Create Bookmark)
- **エンドポイント**: `POST /api/posts/{post_id}/bookmark`
- **説明**: 投稿をブックマークに追加
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
- **リクエスト**:
  ```json
  {
    "collection_id": "integer|null",
    "note": "string|null"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "post_id": "integer",
    "collection_id": "integer|null",
    "note": "string|null",
    "created_at": "datetime"
  }
  ```

## ブックマーク削除 (Remove Bookmark)
- **エンドポイント**: `DELETE /api/posts/{post_id}/bookmark`
- **説明**: 投稿のブックマークを削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "message": "ブックマークを削除しました"
  }
  ```

## ブックマーク一覧取得 (List Bookmarks)
- **エンドポイント**: `GET /api/bookmarks`
- **説明**: ユーザーのブックマーク一覧を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `collection_id`: コレクションIDでフィルター（オプショナル）
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "post": {
          "id": "integer",
          "type": "string",
          "claim": "string",
          "user": {
            "id": "integer",
            "name": "string"
          },
          "created_at": "datetime"
        },
        "collection_id": "integer|null",
        "note": "string|null",
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

## ブックマークコレクション作成 (Create Collection)
- **エンドポイント**: `POST /api/bookmark-collections`
- **説明**: ブックマークコレクションを作成
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```json
  {
    "name": "string",
    "description": "string|null",
    "is_private": "boolean"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "name": "string",
    "description": "string|null",
    "is_private": "boolean",
    "bookmarks_count": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## ブックマークコレクション更新 (Update Collection)
- **エンドポイント**: `PUT /api/bookmark-collections/{id}`
- **説明**: ブックマークコレクションを更新
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: コレクションID
- **リクエスト**:
  ```json
  {
    "name": "string",
    "description": "string|null",
    "is_private": "boolean"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string|null",
    "is_private": "boolean",
    "updated_at": "datetime"
  }
  ```

## ブックマークコレクション削除 (Delete Collection)
- **エンドポイント**: `DELETE /api/bookmark-collections/{id}`
- **説明**: ブックマークコレクションを削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: コレクションID
- **レスポンス**:
  ```json
  {
    "message": "コレクションを削除しました"
  }
  ```

## ブックマークコレクション一覧取得 (List Collections)
- **エンドポイント**: `GET /api/bookmark-collections`
- **説明**: ユーザーのブックマークコレクション一覧を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "name": "string",
        "description": "string|null",
        "is_private": "boolean",
        "bookmarks_count": "integer",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
  ```

## ブックマークコレクション詳細取得 (Get Collection)
- **エンドポイント**: `GET /api/bookmark-collections/{id}`
- **説明**: ブックマークコレクションの詳細を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: コレクションID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string|null",
    "is_private": "boolean",
    "bookmarks_count": "integer",
    "created_at": "datetime",
    "updated_at": "datetime",
    "bookmarks": {
      "data": [
        {
          "id": "integer",
          "post": {
            "id": "integer",
            "type": "string",
            "claim": "string",
            "user": {
              "id": "integer",
              "name": "string"
            }
          },
          "note": "string|null",
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
  }
  ```