# 通知API仕様

## 通知一覧取得 (List Notifications)
- **エンドポイント**: `GET /api/notifications`
- **説明**: ログインユーザーの通知一覧を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `page`: ページ番号
  - `per_page`: 1ページあたりの表示数
  - `read`: 既読/未読フィルター（true/false/all）
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "type": "string",
        "data": {
          "post_id": "integer",
          "comment_id": "integer",
          "user_id": "integer",
          "user_name": "string",
          "user_avatar": "string",
          "message": "string"
        },
        "read_at": "datetime|null",
        "created_at": "datetime"
      }
    ],
    "meta": {
      "current_page": "integer",
      "last_page": "integer",
      "per_page": "integer",
      "total": "integer",
      "unread_count": "integer"
    }
  }
  ```

## 通知既読化 (Mark As Read)
- **エンドポイント**: `PUT /api/notifications/{id}/read`
- **説明**: 特定の通知を既読にする
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: 通知ID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "read_at": "datetime"
  }
  ```

## 全通知既読化 (Mark All As Read)
- **エンドポイント**: `PUT /api/notifications/read-all`
- **説明**: すべての通知を既読にする
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "message": "すべての通知を既読にしました",
    "count": "integer"
  }
  ```

## 通知設定取得 (Get Notification Settings)
- **エンドポイント**: `GET /api/notification-settings`
- **説明**: ユーザーの通知設定を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "email_notifications": {
      "new_follower": "boolean",
      "new_comment": "boolean",
      "new_reaction": "boolean",
      "new_reply": "boolean",
      "post_verification": "boolean"
    },
    "in_app_notifications": {
      "new_follower": "boolean",
      "new_comment": "boolean",
      "new_reaction": "boolean",
      "new_reply": "boolean",
      "post_verification": "boolean"
    }
  }
  ```

## 通知設定更新 (Update Notification Settings)
- **エンドポイント**: `PUT /api/notification-settings`
- **説明**: ユーザーの通知設定を更新
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```json
  {
    "email_notifications": {
      "new_follower": "boolean",
      "new_comment": "boolean",
      "new_reaction": "boolean",
      "new_reply": "boolean",
      "post_verification": "boolean"
    },
    "in_app_notifications": {
      "new_follower": "boolean",
      "new_comment": "boolean",
      "new_reaction": "boolean",
      "new_reply": "boolean",
      "post_verification": "boolean"
    }
  }
  ```
- **レスポンス**:
  ```json
  {
    "message": "通知設定を更新しました"
  }
  ```

## 未読通知数取得 (Get Unread Count)
- **エンドポイント**: `GET /api/notifications/unread-count`
- **説明**: 未読通知の数を取得
- **ヘッダー**: `Authorization: Bearer {token}`
- **レスポンス**:
  ```json
  {
    "count": "integer"
  }
  ```