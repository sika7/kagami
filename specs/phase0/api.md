# Phase 0 API仕様

フェーズ0では、最小限のAPI機能を実装します。以下は実装すべきAPIエンドポイントです。

## 認証API

### POST /api/auth/register
- 機能: ユーザー登録
- 入力:
  ```json
  {
    "name": "ユーザー名",
    "email": "メールアドレス",
    "password": "パスワード",
    "password_confirmation": "パスワード確認"
  }
  ```
- 出力:
  ```json
  {
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "メールアドレス"
    },
    "token": "JWTトークン"
  }
  ```

### POST /api/auth/login
- 機能: ログイン
- 入力:
  ```json
  {
    "email": "メールアドレス",
    "password": "パスワード"
  }
  ```
- 出力:
  ```json
  {
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "メールアドレス"
    },
    "token": "JWTトークン"
  }
  ```

### GET /api/auth/me
- 機能: 現在のユーザー情報取得
- 認証: 必須
- 出力:
  ```json
  {
    "id": 1,
    "name": "ユーザー名",
    "email": "メールアドレス"
  }
  ```

## 投稿API

### GET /api/posts
- 機能: 投稿の一覧取得
- クエリパラメータ:
  - page: ページ番号（オプション）
  - per_page: 1ページあたりの件数（オプション）
  - type: 投稿種類（オプション、「問題」「解決策」「補足」）
- 出力:
  ```json
  {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "type": "問題",
        "claim": "主張",
        "evidence": "根拠",
        "reasoning": "論拠",
        "created_at": "作成日時",
        "user": {
          "id": 1,
          "name": "ユーザー名"
        }
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 20,
      "total": 100
    }
  }
  ```

### POST /api/posts
- 機能: 投稿の作成
- 認証: 必須
- 入力:
  ```json
  {
    "type": "問題",
    "claim": "主張テキスト",
    "evidence": "根拠テキスト",
    "reasoning": "論拠テキスト",
    "parent_id": 1  // 親投稿ID（オプション）
  }
  ```
- 出力:
  ```json
  {
    "id": 2,
    "user_id": 1,
    "type": "問題",
    "claim": "主張テキスト",
    "evidence": "根拠テキスト",
    "reasoning": "論拠テキスト",
    "parent_id": 1,
    "created_at": "作成日時",
    "user": {
      "id": 1,
      "name": "ユーザー名"
    }
  }
  ```

### GET /api/posts/{id}
- 機能: 投稿の詳細取得
- 出力:
  ```json
  {
    "id": 1,
    "user_id": 1,
    "type": "問題",
    "claim": "主張",
    "evidence": "根拠",
    "reasoning": "論拠",
    "created_at": "作成日時",
    "user": {
      "id": 1,
      "name": "ユーザー名"
    }
  }
  ```

### GET /api/posts/{id}/relationships
- 機能: 投稿の親子関係取得
- 出力:
  ```json
  {
    "parent": {  // 親投稿（存在する場合）
      "id": 1,
      "user_id": 1,
      "type": "問題",
      "claim": "主張",
      "created_at": "作成日時"
    },
    "children": [  // 子投稿
      {
        "id": 2,
        "user_id": 1,
        "type": "解決策",
        "claim": "主張",
        "created_at": "作成日時"
      }
    ]
  }
  ```