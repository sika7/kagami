# 検証API仕様

## 検証リクエスト作成 (Create Verification Request)

- **エンドポイント**: `POST /api/posts/{post_id}/verifications`
- **説明**: 投稿の証拠に対する検証リクエストを作成
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `post_id`: 検証対象の投稿ID
- **リクエスト**:
  ```json
  {
    "note": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "post_id": "integer",
    "user_id": "integer",
    "status": "string", // "pending", "approved", "rejected"
    "note": "string",
    "created_at": "datetime"
  }
  ```

## 検証リクエスト一覧取得 (List Verification Requests)

- **エンドポイント**: `GET /api/posts/{post_id}/verifications`
- **説明**: 投稿に対する検証リクエスト一覧を取得
- **パラメータ**:
  - `post_id`: 投稿ID
  - `status`: ステータスフィルター（pending, approved, rejected, all）
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "post_id": "integer",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "status": "string",
        "note": "string",
        "created_at": "datetime",
        "updated_at": "datetime",
        "verification_count": {
          "approved": "integer",
          "rejected": "integer",
          "pending": "integer"
        }
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

## 検証リクエスト評価 (Vote on Verification Request)

- **エンドポイント**: `POST /api/verifications/{id}/votes`
- **説明**: 検証リクエストに対する評価を行う
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: 検証リクエストID
- **リクエスト**:
  ```json
  {
    "vote": "string", // "approve", "reject"
    "comment": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "verification_id": "integer",
    "user_id": "integer",
    "vote": "string",
    "comment": "string",
    "created_at": "datetime"
  }
  ```

## 検証リクエスト詳細取得 (Get Verification Request)

- **エンドポイント**: `GET /api/verifications/{id}`
- **説明**: 検証リクエストの詳細を取得
- **パラメータ**:
  - `id`: 検証リクエストID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "post_id": "integer",
    "user": {
      "id": "integer",
      "name": "string",
      "avatar": "string"
    },
    "status": "string",
    "note": "string",
    "created_at": "datetime",
    "updated_at": "datetime",
    "votes": [
      {
        "id": "integer",
        "user": {
          "id": "integer",
          "name": "string",
          "avatar": "string"
        },
        "vote": "string",
        "comment": "string",
        "created_at": "datetime"
      }
    ],
    "verification_count": {
      "approved": "integer",
      "rejected": "integer",
      "pending": "integer"
    }
  }
  ```

## 検証ステータス更新 (Update Verification Status)

- **エンドポイント**: `PUT /api/verifications/{id}/status`
- **説明**: 検証リクエストのステータスを更新（モデレーター権限）
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: 検証リクエストID
- **リクエスト**:
  ```json
  {
    "status": "string", // "approved", "rejected"
    "note": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "status": "string",
    "note": "string",
    "updated_at": "datetime"
  }
  ```
