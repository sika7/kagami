# Laravel認証システム設定確認

Phase 0の認証システムが正しく設定されました。以下の設定が完了しています：

## 1. Sanctumのインストールと設定

- Laravel Sanctumパッケージをインストール
- Sanctum用のデータベースマイグレーションを実行
- Sanctumの設定ファイルを作成・設定

## 2. 認証関連の設定

- `auth.php`にAPI用のガードを追加
- Userモデルに`HasApiTokens`トレイトを追加
- APIルートの設定とミドルウェアの追加

## 3. API認証エンドポイント

以下のAPIエンドポイントが利用可能になりました：

- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン
- `GET /api/auth/me` - ログインユーザー情報取得（認証必須）
- `POST /api/auth/logout` - ログアウト（認証必須）

## 4. CORS設定

- フロントエンド（localhost:3000）とのクロスオリジン通信を許可
- 認証クッキーのサポートを有効化

## テスト方法

以下のようなリクエストでAPI認証をテストできます：

### ユーザー登録
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"テストユーザー","email":"test@example.com","password":"password","password_confirmation":"password"}'
```

### ログイン
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

レスポンスとして返されるトークンを使用してAPIにアクセスできます。