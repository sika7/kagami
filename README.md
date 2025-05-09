# ディベート型SNSプラットフォーム

## 概要

このプロジェクトは、ディベートの論理構造を活用して情報の確かさを高め、SNS形式で人類の集合知を構築するプラットフォームです。論理構造を可視化することで地球上の問題解決を目指します。

## プロジェクト名

名前はkagamiです。理由は人の心を映し出しそうだから。

## ライセンス

このプロジェクトは [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) の下で提供されています。

## 目的

- ディベート手法を使用した人類の集合知の構築
- 地球上のすべての生物にとってより良い未来の創造
- クリティカルシンキングの促進
- 確かな情報の提供と偽情報の防止

## 主な機能

- 問題についての構造化された議論
- 「主張」「根拠(証拠)」「論拠」の3点セットによる投稿
- 多様な投稿形式（問題提示、問題分割、解決策提示、補足、要約、翻訳、推定、検証、倫理）
- ツリー状の議論構造
- 多対多の関係性による情報の整理
- 複数形式のエビデンス（PDF、画像、音声、サイト、数式）

## 技術スタック

- **バックエンド**: Laravel (PHP 8.x)
- **フロントエンド**: React with Next.js (TypeScript) ※初期フェーズはSPAモードで使用

## 開発環境セットアップ

### バックエンド (Laravel)

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

### フロントエンド (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## テスト実行

### バックエンド

```bash
cd backend
php artisan test
```

### フロントエンド

```bash
cd frontend
npm run lint
npm run typecheck
npm test
```

## 方針

- オープンソースでの基本機能提供
- 企業向けプライベートサーバー設置オプション
- APIによるオープン/プライベートサーバー間のデータ共有

## 理念

- 議論の場の提供による集合知の活用
- 「知識より倫理観、倫理観より愛」の実践
- 地球上のあらゆる生物にとってより良い未来の創造

## 行動規範

- 相手を尊重する議論（誹謗中傷、論破目的の投稿は禁止）
- センシティブな内容は適切に管理

## 対象ユーザー

- 専門家（情報検索、投稿）
- 一般消費者（情報閲覧、アイデア発案）
- AI開発者（学習データ取得、API連携）
