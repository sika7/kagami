# メディアAPI仕様

## メディアアップロード (Upload Media)
- **エンドポイント**: `POST /api/media`
- **説明**: 各種メディアファイルのアップロード
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```
  multipart/form-data
  ```
  - `file`: メディアファイル（画像、PDF、音声）
  - `type`: メディアタイプ（image, pdf, audio）
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "url": "string",
    "type": "string",
    "filename": "string",
    "size": "integer",
    "mime_type": "string",
    "created_at": "datetime"
  }
  ```

## メディア取得 (Get Media)
- **エンドポイント**: `GET /api/media/{id}`
- **説明**: 特定メディアの情報取得
- **パラメータ**:
  - `id`: メディアID
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "url": "string",
    "type": "string",
    "filename": "string",
    "size": "integer",
    "mime_type": "string",
    "created_at": "datetime"
  }
  ```

## メディア削除 (Delete Media)
- **エンドポイント**: `DELETE /api/media/{id}`
- **説明**: メディアの削除
- **ヘッダー**: `Authorization: Bearer {token}`
- **パラメータ**:
  - `id`: メディアID
- **レスポンス**:
  ```json
  {
    "message": "メディアを削除しました"
  }
  ```

## URL魚拓生成 (Create Web Archive)
- **エンドポイント**: `POST /api/media/web-archive`
- **説明**: 指定URLの魚拓（スナップショット）を作成
- **ヘッダー**: `Authorization: Bearer {token}`
- **リクエスト**:
  ```json
  {
    "url": "string"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "integer",
    "user_id": "integer",
    "original_url": "string",
    "archive_url": "string",
    "created_at": "datetime"
  }
  ```

## 投稿メディア一覧取得 (Get Post Media)
- **エンドポイント**: `GET /api/posts/{post_id}/media`
- **説明**: 特定投稿に紐づくメディア一覧取得
- **パラメータ**:
  - `post_id`: 投稿ID
- **レスポンス**:
  ```json
  {
    "data": [
      {
        "id": "integer",
        "url": "string",
        "type": "string",
        "filename": "string",
        "mime_type": "string",
        "created_at": "datetime"
      }
    ]
  }
  ```