---
guideline_version: 1.0
language: TypeScript / JavaScript / PHP
target: human_and_ai
description: 'Webアプリ開発において、素早い開発とコードの可読性・変更容易性を最優先するためのルール。'
created_at: 2025-04-27
---

# Webアプリ用コーディングガイドライン（スピード・可読性重視版）

## 基本方針

- コードは**直感的に読めること**を最優先する。
- 必要以上に抽象化しない（DRYよりも可読性優先）。
- 名前は具体的に、省略しない。
- 小さい関数・小さいコンポーネントを心がける。
- 小さい関数をテストすることでバグを防ぐ。

## 命名規則

| 対象             | 規則                                                    |
| ---------------- | ------------------------------------------------------- |
| 変数・関数名     | キャメルケース (`fetchUser`, `updateProfile`)           |
| コンポーネント名 | パスカルケース (`UserCard`, `ProfileForm`)              |
| ファイル名       | 小文字ケバブケース (`user-card.tsx`, `profile-form.ts`) |
| ディレクトリ名   | 小文字ケバブケース (`components/`, `hooks/`)            |
| 定数             | UPPER_SNAKE_CASE (`API_URL`, `MAX_LENGTH`)              |

## コーディングスタイル

- エディター設定／自動フォーマッタ設定に従うこと。
- 標準の設定は.editorconfigおよびprettier.config.jsで定義する。
- エディターにはPrettierプラグインを必ず導入する。
- 手動整形は禁止（必ずフォーマッタ経由で保存時に自動整形する）。
- 空行を適切に使い、コードを**視覚的に区切る**。
- 可能な限り型をつける（TypeScriptでは型注釈を書く）。

### インポート順序

1. 標準ライブラリ
2. サードパーティライブラリ
3. アプリ内モジュール（絶対パスなら `@/` などを使う）

例：

```typescript
import {useState} from 'react'
import axios from 'axios'
import {useAuth} from '@/hooks/useAuth'
```

## 関数・コンポーネント設計

- 関数はできるだけ**1画面で収まる**大きさにする（目安: 20行以内）。
- コンポーネントは**単一責任**にする。できれば**propsは5個以内**に。
- ロジックとUIを分離できるなら、カスタムHookなどで切り出す。

## 型・安全性

- TypeScriptでは**必ず型注釈を明示**する。暗黙推論を避ける。
- 関数の戻り値にも型をつける。
- `any`型は全面禁止。必要な場合は型ガード関数を作成する。
- null/undefinedの可能性を考慮したコードを書く。（Optional chaining, Nullish coalescing）

## エラーハンドリング

- try-catchブロックは必須。
- catch節では具体的なエラー型を取り、適切なログ出力またはリカバリ処理を行う。
- 予期できるエラーと予期しないエラーを分離する。

例：

```typescript
try {
  await service.fetchData()
} catch (error) {
  if (error instanceof NetworkError) {
    logger.warn('Network issue occurred', error)
    retry()
  } else {
    logger.error('Unexpected error', error)
    throw error
  }
}
```

## コメントポリシー

- **コメントは最後の手段**。
- 重要なロジックには「なぜこの設計にしたか」を簡潔に日本語で書く。
- TODOやFIXMEは期限や担当者を明示。
- 変更が難しい部分は「設計意図」を必ず残す。

例：

```typescript
// FIXME(john, 2025-05-01): Temporary workaround for API issue
```

## 禁止事項

- `any`型の使用
- マジックナンバーの直書き
- 無意味な略語 (`usrNm`とかはダメ。`userName`と正しく書く)
- 意図しない暗黙の型変換（==や!=ではなく===、!==を使う）
- 例外を無視するcatch (`catch {}`)
- ビジネスロジックをUI層に直接書くこと
- グローバル状態の不注意な共有
