# AI_PROMPT_TEMPLATE.md

## プロジェクト環境情報

プロジェクト: kagami
フレームワーク: Laravel 12
開発環境: Docker Compose

## 基本指示

Laravel 12を使用しています。これはあなたの学習データに含まれていない可能性があります。最新のドキュメントを参照してください: https://laravel.com/docs/12.x/helpers#deferred-function-compatibility
不明な点やベストプラクティスがある場合は、作業を始める前に質問や提案をしてください
コードを変更する前に、その理由と期待される効果について説明してください

## 開発環境に関する注意事項

npmやcomposerを使用する場合は、Dockerコンテナ内で実行してください
例: docker-compose exec backend composer install
例: docker-compose exec frontend npm install
新しいパッケージを追加する際は、コンテナが再起動しても環境が維持されるよう、package.jsonやcomposer.jsonに反映させてください

## 作業記録のお願い

実装した内容を簡潔にまとめてください
次の形式でステートファイルに記録してください:

```
## 【日付】実装内容

### 完了した作業
- 機能A: XXXの実装
- 機能B: YYYの修正

### 次回の作業予定
- 機能C: ZZZの実装

### 課題・懸念点
- 〜〜についての検討が必要
```
