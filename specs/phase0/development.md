# Phase 0 開発環境構築ガイド

SNSプラットフォームのローカル開発環境は、Docker Composeを使用して構築されています。

Docker関連のファイルは以下のように配置されています：

```
/
├── docker-compose.yml         # メインの設定ファイル
├── docker/
│   ├── backend/               # バックエンド関連の設定
│   │   └── Dockerfile         # PHPコンテナ用Dockerfile
│   ├── frontend/              # フロントエンド関連の設定
│   │   └── Dockerfile         # Node.jsコンテナ用Dockerfile
│   └── nginx/                 # Nginx関連の設定
│       └── conf.d/
│           └── app.conf       # Nginxの設定ファイル
```

## 必要条件

- Docker Engine: 20.10.0以上
- Docker Compose: 2.0.0以上

## 環境構成

開発環境は以下のコンテナで構成されています：

1. **バックエンド (Laravel)**
   - PHP 8.2 FPM
   - Composer
   - 実行ポート: 9000 (内部)

2. **Webサーバー (Nginx)**
   - ポート: 8000:80
   - バックエンドへのリバースプロキシ

3. **フロントエンド (Remix)**
   - Node.js 18
   - ポート: 3000:5173
   - 開発サーバー

4. **データベース (MariaDB)**
   - MariaDB 10.5
   - ポート: 3306:3306
   - データベース名: sns
   - ユーザー名: sns
   - パスワード: sns_password

5. **キャッシュ (Redis)**
   - Redis Alpine
   - ポート: 6379:6379

## 開発環境の起動

1. プロジェクトのルートディレクトリで以下のコマンドを実行:

```bash
docker-compose up -d
```

2. バックエンドのセットアップ:

```bash
# コンテナに入る
docker-compose exec backend bash

# 依存関係のインストール
composer install

# .envファイルの作成
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# マイグレーションの実行
php artisan migrate

# シードデータの登録
php artisan db:seed
```

3. フロントエンドのセットアップ:

```bash
# コンテナは自動的にnpm run devを実行
# 修正が必要な場合はコンテナに入る
docker-compose exec frontend sh
```

## アクセス方法

- **バックエンドAPI**: http://localhost:8000/api
- **フロントエンド**: http://localhost:3000

## 開発環境の停止

```bash
docker-compose down
```

## データベース永続化

MySQLのデータは名前付きボリューム `sns-db-data` に保存され、コンテナを再作成しても保持されます。

## ホットリロード

- **バックエンド**: ソースコードの変更は即座に反映されます
- **フロントエンド**: Remixの開発サーバーがホットリロードを提供します

## トラブルシューティング

1. **コンテナが起動しない場合**:
   ```bash
   docker-compose logs
   ```

2. **ポートの競合**:
   すでに使用されているポートがある場合は、`docker-compose.yml`で変更してください。

3. **パーミッションの問題**:
   ```bash
   sudo chown -R $USER:$USER ./backend
   sudo chown -R $USER:$USER ./frontend
   ```
