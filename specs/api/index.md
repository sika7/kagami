# API一覧

## 認証
- [認証API](./auth.md) - 登録、ログイン、ログアウト、認証関連

## ユーザー管理
- [ユーザーAPI](./users.md) - プロフィール、フォロー機能

## 投稿
- [投稿API](./posts.md) - 投稿の作成、取得、更新、削除、ツリー構造
- [コメントAPI](./comments.md) - コメント機能
- [リアクションAPI](./reactions.md) - いいね、同意、不同意などのリアクション
- [ブックマークAPI](./bookmarks.md) - 投稿の保存と整理

## メディア
- [メディアAPI](./media.md) - 画像、PDF、音声、URL魚拓

## 検証
- [検証API](./verification.md) - 証拠の検証プロセス

## 通知
- [通知API](./notifications.md) - リアルタイム通知とアラート

## 検索
- [検索API (GraphQL)](./search.md) - 高度な検索と取得機能

## API規約

### エラーレスポンス形式
```json
{
  "message": "エラーメッセージ",
  "errors": {
    "field_name": [
      "エラー詳細1",
      "エラー詳細2"
    ]
  }
}
```

### 認証
- 認証が必要なエンドポイントには `Authorization: Bearer {token}` ヘッダーが必要
- 認証失敗時は 401 Unauthorized を返却

### ページネーション
- ページネーションを行うAPIでは以下のメタ情報を返却
```json
"meta": {
  "current_page": "integer",
  "last_page": "integer",
  "per_page": "integer",
  "total": "integer"
}
```

### レート制限
- APIリクエストは1時間あたり60リクエストに制限
- 制限超過時は429 Too Many Requestsを返却
- レート制限情報はレスポンスヘッダーに含まれる
  - `X-RateLimit-Limit`: 上限値
  - `X-RateLimit-Remaining`: 残りリクエスト数
  - `X-RateLimit-Reset`: リセット時間(UNIX時間)