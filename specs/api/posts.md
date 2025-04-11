# 投稿API仕様

## 投稿一覧取得 (List Posts)
- **エンドポイント**: `GET /api/posts`
- **説明**: 投稿一覧の取得
- **パラメータ**:
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
  - `type`: 投稿タイプ（問題提示、問題分割、解決策提示、補足、要約、翻訳、推定、検証、倫理）
  - `search`: 検索キーワード
  - `sort`: ソート順（latest, popular）
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "type": "string",
        "claim": "string",
        "evidence": "string",
        "warrant": "string",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "media": [
          {
            "id": "integer",
            "type": "string",
            "url": "string"
          }
        ],
        "reactions_count": {
          "like": "integer",
          "agree": "integer",
          "disagree": "integer"
        },
        "comments_count": "integer",
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

## 投稿詳細取得 (Get Post)
- **エンドポイント**: `GET /api/posts/{id}`
- **説明**: 特定の投稿詳細取得
- **パラメータ**:
  - `id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "type": "string",
    "claim": "string",
    "evidence": "string",
    "warrant": "string",
    "user": {
      "id": "integer",
      "name": "string",
      "avatar": "string"
    },
    "media": [
      {
        "id": "integer",
        "type": "string",
        "url": "string"
      }
    ],
    "parent_id": "integer",
    "related_posts": [
      {
        "id": "integer",
        "type": "string",
        "claim": "string"
      }
    ],
    "reactions": {
      "like": "integer",
      "agree": "integer",
      "disagree": "integer"
    },
    "comments_count": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## 投稿作成 (Create Post)
- **エンドポイント**: `POST /api/posts`
- **説明**: 新規投稿の作成
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```json
  {
    "type": "string",
    "claim": "string",
    "evidence": "string",
    "warrant": "string",
    "parent_id": "integer|null",
    "related_post_ids": ["integer"],
    "media": ["file"]
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "type": "string",
    "claim": "string",
    "evidence": "string",
    "warrant": "string",
    "user_id": "integer",
    "parent_id": "integer|null",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## 投稿更新 (Update Post)
- **エンドポイント**: `PUT /api/posts/{id}`
- **説明**: 既存投稿の更新
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: 投稿ID
- **リクエスト**:
  ```json
  {
    "type": "string",
    "claim": "string",
    "evidence": "string",
    "warrant": "string",
    "related_post_ids": ["integer"],
    "media": ["file"]
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "type": "string",
    "claim": "string",
    "evidence": "string",
    "warrant": "string",
    "user_id": "integer",
    "parent_id": "integer|null",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

## 投稿削除 (Delete Post)
- **エンドポイント**: `DELETE /api/posts/{id}`
- **説明**: 投稿の削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "message": "投稿を削除しました"
  }
  ```

## 投稿ツリー取得 (Get Post Tree)
- **エンドポイント**: `GET /api/posts/{id}/tree`
- **説明**: 投稿とその返信の階層構造を取得
- **パラメータ**:
  - `id`: 投稿ID
  - `depth`: 取得する深さの制限（デフォルト: 3）
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "type": "string",
    "claim": "string",
    "user": {
      "id": "integer",
      "name": "string"
    },
    "children": [
      {
        "id": "integer",
        "type": "string",
        "claim": "string",
        "user": {
          "id": "integer",
          "name": "string"
        },
        "children": []
      }
    ]
  }
  ```