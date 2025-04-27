# データモデル仕様

本ドキュメントでは、SNSプラットフォームのデータモデル構造を定義します。これらのモデルはLaravel（PHP）のEloquentモデルとして実装されます。

## ユーザー関連モデル

### User

ユーザーアカウント情報を管理します。

| フィールド        | タイプ    | 説明                       | その他                                                         |
| ----------------- | --------- | -------------------------- | -------------------------------------------------------------- |
| id                | bigint    | ユーザーID（主キー）       | 自動採番                                                       |
| name              | string    | ユーザー名                 | max:255                                                        |
| email             | string    | メールアドレス             | unique, max:255                                                |
| email_verified_at | timestamp | メール確認日時             | nullable                                                       |
| password          | string    | パスワード（ハッシュ済み） | max:255                                                        |
| profile_image     | string    | プロフィール画像URL        | nullable, max:255                                              |
| bio               | text      | 自己紹介文                 | nullable                                                       |
| settings          | json      | ユーザー設定データ         | notification_preferences, privacy, content_filter, language 等 |
| remember_token    | string    | 自動ログイン用トークン     | nullable, max:100                                              |
| created_at        | timestamp | 作成日時                   | 自動設定                                                       |
| updated_at        | timestamp | 更新日時                   | 自動設定                                                       |

**リレーション:**

- hasMany: Post - ユーザーの投稿
- hasMany: Reaction - ユーザーのリアクション
- belongsToMany: Role - ユーザーの権限ロール
- hasMany: VerificationEvaluation - ユーザーの検証評価
- hasMany: ExpertiseLevel - ユーザーの専門性レベル
- belongsToMany: Community - 参加コミュニティ

### Role

ユーザーの権限ロールを定義します。

| フィールド  | タイプ    | 説明                                  | その他         |
| ----------- | --------- | ------------------------------------- | -------------- |
| id          | bigint    | ロールID（主キー）                    | 自動採番       |
| name        | string    | ロール名（admin, moderator, user 等） | max:50, unique |
| description | string    | ロールの説明                          | max:255        |
| created_at  | timestamp | 作成日時                              | 自動設定       |
| updated_at  | timestamp | 更新日時                              | 自動設定       |

**リレーション:**

- belongsToMany: User - ロールを持つユーザー
- belongsToMany: Permission - ロールに付与された権限

### Permission

システム内の各種権限を定義します。

| フィールド  | タイプ    | 説明             | その他         |
| ----------- | --------- | ---------------- | -------------- |
| id          | bigint    | 権限ID（主キー） | 自動採番       |
| name        | string    | 権限名           | max:50, unique |
| description | string    | 権限の説明       | max:255        |
| created_at  | timestamp | 作成日時         | 自動設定       |
| updated_at  | timestamp | 更新日時         | 自動設定       |

**リレーション:**

- belongsToMany: Role - 権限を持つロール

### ExpertiseLevel

ユーザーの専門分野とレベルを管理します。

| フィールド         | タイプ    | 説明                                | その他                 |
| ------------------ | --------- | ----------------------------------- | ---------------------- |
| id                 | bigint    | 専門性ID（主キー）                  | 自動採番               |
| user_id            | bigint    | ユーザーID                          | 外部キー               |
| domain             | string    | 専門分野（mathematics, physics 等） | max:50                 |
| level              | integer   | 専門性レベル（1-5）                 | default: 1             |
| score              | decimal   | 専門性スコア（0-100）               | precision: 5, scale: 2 |
| contribution_score | decimal   | 貢献投稿スコア                      | precision: 5, scale: 2 |
| verification_score | decimal   | 検証精度スコア                      | precision: 5, scale: 2 |
| peer_score         | decimal   | ピア評価スコア                      | precision: 5, scale: 2 |
| last_activity_at   | timestamp | 最終活動日時                        | nullable               |
| created_at         | timestamp | 作成日時                            | 自動設定               |
| updated_at         | timestamp | 更新日時                            | 自動設定               |

**リレーション:**

- belongsTo: User - ユーザー

## 投稿関連モデル

### Post

ユーザーの投稿データを管理します。

| フィールド          | タイプ    | 説明               | その他                                                                                                                 |
| ------------------- | --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| id                  | bigint    | 投稿ID（主キー）   | 自動採番                                                                                                               |
| user_id             | bigint    | 投稿者ID           | 外部キー                                                                                                               |
| title               | string    | 投稿タイトル       | max:255                                                                                                                |
| post_type           | string    | 投稿タイプ         | max:30, enum（problem, solution, supplement, summary, translation, estimation, verification, ethics, logical_writing） |
| claim               | text      | 主張内容           |                                                                                                                        |
| evidence            | text      | 根拠内容           |                                                                                                                        |
| reasoning           | text      | 論拠内容           |                                                                                                                        |
| importance_score    | decimal   | 重要度スコア       | precision: 6, scale: 2, default: 0                                                                                     |
| sensitivity         | boolean   | センシティブフラグ | default: false                                                                                                         |
| verification_status | string    | 検証ステータス     | max:20, enum（pending, in_progress, verified, not_verified, disputed）                                                 |
| status              | string    | 投稿ステータス     | max:20, enum（draft, published, hidden, archived）                                                                     |
| created_at          | timestamp | 作成日時           | 自動設定                                                                                                               |
| updated_at          | timestamp | 更新日時           | 自動設定                                                                                                               |

**リレーション:**

- belongsTo: User - 投稿者
- hasMany: MediaAttachment - 添付メディア
- hasMany: Reaction - リアクション
- belongsToMany: Tag - 投稿に付けられたタグ
- hasMany: Relationship as FromRelationship - 投稿からの関連付け
- hasMany: Relationship as ToRelationship - 投稿への関連付け
- belongsToMany: Community - 投稿が属するコミュニティ
- hasMany: VerificationRequest - 検証リクエスト

### MediaAttachment

投稿に添付されるメディアファイルを管理します。

| フィールド        | タイプ    | 説明                     | その他                                 |
| ----------------- | --------- | ------------------------ | -------------------------------------- |
| id                | bigint    | メディアID（主キー）     | 自動採番                               |
| user_id           | bigint    | アップロードユーザーID   | 外部キー                               |
| post_id           | bigint    | 投稿ID                   | 外部キー, nullable                     |
| type              | string    | メディアタイプ           | max:20, enum（image, document, audio） |
| filename          | string    | ファイル名               | max:255                                |
| original_filename | string    | 元のファイル名           | max:255                                |
| file_path         | string    | ファイルパス             | max:255                                |
| file_size         | integer   | ファイルサイズ（バイト） |                                        |
| mime_type         | string    | MIMEタイプ               | max:100                                |
| thumbnail_path    | string    | サムネイルパス           | nullable, max:255                      |
| caption           | string    | メディアの説明           | nullable, max:500                      |
| created_at        | timestamp | 作成日時                 | 自動設定                               |
| updated_at        | timestamp | 更新日時                 | 自動設定                               |

**リレーション:**

- belongsTo: User - アップロードユーザー
- belongsTo: Post - 添付された投稿

### Relationship

投稿間の関連付けを管理します。多対多の関係や親子関係を表現します。

| フィールド    | タイプ    | 説明             | その他                                                                      |
| ------------- | --------- | ---------------- | --------------------------------------------------------------------------- |
| id            | bigint    | 関連ID（主キー） | 自動採番                                                                    |
| from_post_id  | bigint    | 元の投稿ID       | 外部キー                                                                    |
| to_post_id    | bigint    | 関連先の投稿ID   | 外部キー                                                                    |
| relation_type | string    | 関係タイプ       | max:50, enum（parent_child, supplement, verification, refutation, summary） |
| created_by    | bigint    | 作成者ID         | 外部キー                                                                    |
| created_at    | timestamp | 作成日時         | 自動設定                                                                    |
| updated_at    | timestamp | 更新日時         | 自動設定                                                                    |

**リレーション:**

- belongsTo: Post as FromPost - 元の投稿
- belongsTo: Post as ToPost - 関連先の投稿
- belongsTo: User as Creator - 関連付けを作成したユーザー

### Tag

投稿のタグを管理します。

| フィールド | タイプ    | 説明             | その他         |
| ---------- | --------- | ---------------- | -------------- |
| id         | bigint    | タグID（主キー） | 自動採番       |
| name       | string    | タグ名           | max:50, unique |
| created_at | timestamp | 作成日時         | 自動設定       |
| updated_at | timestamp | 更新日時         | 自動設定       |

**リレーション:**

- belongsToMany: Post - タグが付けられた投稿

### Reaction

投稿へのリアクションを管理します。

| フィールド | タイプ    | 説明                     | その他                                     |
| ---------- | --------- | ------------------------ | ------------------------------------------ |
| id         | bigint    | リアクションID（主キー） | 自動採番                                   |
| user_id    | bigint    | ユーザーID               | 外部キー                                   |
| post_id    | bigint    | 投稿ID                   | 外部キー                                   |
| type       | string    | リアクションタイプ       | max:30, enum（like, insightful, question） |
| created_at | timestamp | 作成日時                 | 自動設定                                   |
| updated_at | timestamp | 更新日時                 | 自動設定                                   |

**リレーション:**

- belongsTo: User - リアクションしたユーザー
- belongsTo: Post - リアクションされた投稿

## 検証関連モデル

### VerificationRequest

投稿の検証リクエストを管理します。

| フィールド        | タイプ    | 説明                       | その他                                                               |
| ----------------- | --------- | -------------------------- | -------------------------------------------------------------------- |
| id                | bigint    | 検証リクエストID（主キー） | 自動採番                                                             |
| post_id           | bigint    | 検証対象の投稿ID           | 外部キー                                                             |
| user_id           | bigint    | リクエスト者ID             | 外部キー                                                             |
| verification_type | string    | 検証タイプ                 | max:30, enum（evidence, reasoning, claim）                           |
| status            | string    | 検証ステータス             | max:30, enum（pending, assigned, in_progress, completed, cancelled） |
| note              | text      | 検証依頼時のメモ           | nullable                                                             |
| completed_at      | timestamp | 完了日時                   | nullable                                                             |
| created_at        | timestamp | 作成日時                   | 自動設定                                                             |
| updated_at        | timestamp | 更新日時                   | 自動設定                                                             |

**リレーション:**

- belongsTo: Post - 検証対象の投稿
- belongsTo: User - 検証リクエスト者
- hasMany: VerificationEvaluation - 検証評価
- belongsToMany: User as Verifiers - 検証を担当するユーザー

### VerificationEvaluation

検証者による評価結果を管理します。

| フィールド              | タイプ    | 説明             | その他                                      |
| ----------------------- | --------- | ---------------- | ------------------------------------------- |
| id                      | bigint    | 評価ID（主キー） | 自動採番                                    |
| verification_request_id | bigint    | 検証リクエストID | 外部キー                                    |
| user_id                 | bigint    | 評価者ID         | 外部キー                                    |
| evaluation_type         | string    | 評価タイプ       | max:30, enum（positive, neutral, negative） |
| comment                 | text      | 評価コメント     | nullable                                    |
| evidence_quality        | decimal   | 証拠の質評価     | precision: 3, scale: 2, nullable            |
| reasoning_quality       | decimal   | 論拠の質評価     | precision: 3, scale: 2, nullable            |
| relevance               | decimal   | 関連性評価       | precision: 3, scale: 2, nullable            |
| created_at              | timestamp | 作成日時         | 自動設定                                    |
| updated_at              | timestamp | 更新日時         | 自動設定                                    |

**リレーション:**

- belongsTo: VerificationRequest - 対象の検証リクエスト
- belongsTo: User - 評価者

### VerificationAssignment

検証者のアサイン情報を管理します。

| フィールド              | タイプ    | 説明                 | その他                                                     |
| ----------------------- | --------- | -------------------- | ---------------------------------------------------------- |
| id                      | bigint    | アサインID（主キー） | 自動採番                                                   |
| verification_request_id | bigint    | 検証リクエストID     | 外部キー                                                   |
| user_id                 | bigint    | 検証者ID             | 外部キー                                                   |
| status                  | string    | アサインステータス   | max:30, enum（assigned, in_progress, completed, declined） |
| assigned_at             | timestamp | アサイン日時         | 自動設定                                                   |
| completed_at            | timestamp | 完了日時             | nullable                                                   |
| created_at              | timestamp | 作成日時             | 自動設定                                                   |
| updated_at              | timestamp | 更新日時             | 自動設定                                                   |

**リレーション:**

- belongsTo: VerificationRequest - 対象の検証リクエスト
- belongsTo: User - 検証者

## コミュニティ関連モデル

### Community

コミュニティ情報を管理します。

| フィールド  | タイプ    | 説明                     | その他                                   |
| ----------- | --------- | ------------------------ | ---------------------------------------- |
| id          | bigint    | コミュニティID（主キー） | 自動採番                                 |
| name        | string    | コミュニティ名           | max:100, unique                          |
| description | text      | コミュニティ説明         | nullable                                 |
| icon        | string    | アイコン画像パス         | nullable, max:255                        |
| banner      | string    | バナー画像パス           | nullable, max:255                        |
| created_by  | bigint    | 作成者ID                 | 外部キー                                 |
| status      | string    | ステータス               | max:30, enum（active, archived, hidden） |
| created_at  | timestamp | 作成日時                 | 自動設定                                 |
| updated_at  | timestamp | 更新日時                 | 自動設定                                 |

**リレーション:**

- belongsTo: User as Creator - コミュニティ作成者
- belongsToMany: User - コミュニティメンバー
- belongsToMany: Post - コミュニティ内の投稿
- belongsToMany: Category - コミュニティのカテゴリ

### CommunityMembership

ユーザーのコミュニティメンバーシップ情報を管理します。

| フィールド   | タイプ    | 説明                       | その他                                   |
| ------------ | --------- | -------------------------- | ---------------------------------------- |
| id           | bigint    | メンバーシップID（主キー） | 自動採番                                 |
| user_id      | bigint    | ユーザーID                 | 外部キー                                 |
| community_id | bigint    | コミュニティID             | 外部キー                                 |
| role         | string    | コミュニティ内のロール     | max:30, enum（member, moderator, admin） |
| joined_at    | timestamp | 参加日時                   | 自動設定                                 |
| created_at   | timestamp | 作成日時                   | 自動設定                                 |
| updated_at   | timestamp | 更新日時                   | 自動設定                                 |

**リレーション:**

- belongsTo: User - メンバー
- belongsTo: Community - コミュニティ

### Category

コミュニティや投稿のカテゴリを管理します。

| フィールド  | タイプ    | 説明                 | その他            |
| ----------- | --------- | -------------------- | ----------------- |
| id          | bigint    | カテゴリID（主キー） | 自動採番          |
| name        | string    | カテゴリ名           | max:50, unique    |
| description | string    | カテゴリ説明         | nullable, max:255 |
| created_at  | timestamp | 作成日時             | 自動設定          |
| updated_at  | timestamp | 更新日時             | 自動設定          |

**リレーション:**

- belongsToMany: Community - カテゴリに属するコミュニティ

## 通知関連モデル

### Notification

ユーザー通知を管理します。

| フィールド | タイプ    | 説明               | その他         |
| ---------- | --------- | ------------------ | -------------- |
| id         | bigint    | 通知ID（主キー）   | 自動採番       |
| user_id    | bigint    | 通知対象ユーザーID | 外部キー       |
| type       | string    | 通知タイプ         | max:50         |
| data       | json      | 通知データ         |                |
| read       | boolean   | 既読フラグ         | default: false |
| created_at | timestamp | 作成日時           | 自動設定       |
| updated_at | timestamp | 更新日時           | 自動設定       |

**リレーション:**

- belongsTo: User - 通知対象ユーザー

## 統計関連モデル

### ImportanceScoreHistory

投稿の重要度スコア履歴を記録します。

| フィールド         | タイプ    | 説明               | その他                 |
| ------------------ | --------- | ------------------ | ---------------------- |
| id                 | bigint    | 履歴ID（主キー）   | 自動採番               |
| post_id            | bigint    | 投稿ID             | 外部キー               |
| score              | decimal   | 重要度スコア       | precision: 6, scale: 2 |
| basic_score        | decimal   | 基本スコア         | precision: 6, scale: 2 |
| relation_score     | decimal   | 関連性スコア       | precision: 6, scale: 2 |
| verification_score | decimal   | 検証スコア         | precision: 6, scale: 2 |
| expertise_bonus    | decimal   | 専門性評価ボーナス | precision: 6, scale: 2 |
| ethics_score       | decimal   | いつくしみスコア   | precision: 6, scale: 2 |
| time_decay         | decimal   | 時間減衰係数       | precision: 4, scale: 3 |
| created_at         | timestamp | 作成日時           | 自動設定               |

**リレーション:**

- belongsTo: Post - 対象の投稿

### ExpertiseLevelHistory

ユーザーの専門性レベル履歴を記録します。

| フィールド         | タイプ    | 説明             | その他                 |
| ------------------ | --------- | ---------------- | ---------------------- |
| id                 | bigint    | 履歴ID（主キー） | 自動採番               |
| expertise_level_id | bigint    | 専門性ID         | 外部キー               |
| user_id            | bigint    | ユーザーID       | 外部キー               |
| domain             | string    | 専門分野         | max:50                 |
| level              | integer   | 専門性レベル     |                        |
| score              | decimal   | 専門性スコア     | precision: 5, scale: 2 |
| contribution_score | decimal   | 貢献投稿スコア   | precision: 5, scale: 2 |
| verification_score | decimal   | 検証精度スコア   | precision: 5, scale: 2 |
| peer_score         | decimal   | ピア評価スコア   | precision: 5, scale: 2 |
| reason             | string    | 変更理由         | nullable, max:255      |
| created_at         | timestamp | 作成日時         | 自動設定               |

**リレーション:**

- belongsTo: ExpertiseLevel - 対象の専門性レベル
- belongsTo: User - 対象のユーザー

## 中間テーブル

### RoleUser

ユーザーと権限ロールの中間テーブル。

| フィールド | タイプ    | 説明       | その他   |
| ---------- | --------- | ---------- | -------- |
| user_id    | bigint    | ユーザーID | 外部キー |
| role_id    | bigint    | ロールID   | 外部キー |
| created_at | timestamp | 作成日時   | 自動設定 |
| updated_at | timestamp | 更新日時   | 自動設定 |

### RolePermission

ロールと権限の中間テーブル。

| フィールド    | タイプ    | 説明     | その他   |
| ------------- | --------- | -------- | -------- |
| role_id       | bigint    | ロールID | 外部キー |
| permission_id | bigint    | 権限ID   | 外部キー |
| created_at    | timestamp | 作成日時 | 自動設定 |
| updated_at    | timestamp | 更新日時 | 自動設定 |

### PostTag

投稿とタグの中間テーブル。

| フィールド | タイプ    | 説明     | その他   |
| ---------- | --------- | -------- | -------- |
| post_id    | bigint    | 投稿ID   | 外部キー |
| tag_id     | bigint    | タグID   | 外部キー |
| created_at | timestamp | 作成日時 | 自動設定 |
| updated_at | timestamp | 更新日時 | 自動設定 |

### PostCommunity

投稿とコミュニティの中間テーブル。

| フィールド   | タイプ    | 説明           | その他   |
| ------------ | --------- | -------------- | -------- |
| post_id      | bigint    | 投稿ID         | 外部キー |
| community_id | bigint    | コミュニティID | 外部キー |
| created_at   | timestamp | 作成日時       | 自動設定 |
| updated_at   | timestamp | 更新日時       | 自動設定 |

### CommunityCategory

コミュニティとカテゴリの中間テーブル。

| フィールド   | タイプ    | 説明           | その他   |
| ------------ | --------- | -------------- | -------- |
| community_id | bigint    | コミュニティID | 外部キー |
| category_id  | bigint    | カテゴリID     | 外部キー |
| created_at   | timestamp | 作成日時       | 自動設定 |
| updated_at   | timestamp | 更新日時       | 自動設定 |

### VerificationRequestVerifier

検証リクエストと検証者の中間テーブル。

| フィールド              | タイプ    | 説明             | その他   |
| ----------------------- | --------- | ---------------- | -------- |
| verification_request_id | bigint    | 検証リクエストID | 外部キー |
| user_id                 | bigint    | 検証者ID         | 外部キー |
| created_at              | timestamp | 作成日時         | 自動設定 |
| updated_at              | timestamp | 更新日時         | 自動設定 |

## インデックス

各テーブルに対して、以下のインデックスを設定する予定です：

### User

- email に UNIQUE インデックス
- name にインデックス

### Post

- user_id にインデックス
- post_type にインデックス
- importance_score にインデックス
- verification_status にインデックス
- status にインデックス
- created_at にインデックス

### MediaAttachment

- user_id にインデックス
- post_id にインデックス
- type にインデックス

### Relationship

- from_post_id にインデックス
- to_post_id にインデックス
- relation_type にインデックス
- (from_post_id, to_post_id) に複合インデックス

### Tag

- name に UNIQUE インデックス

### Reaction

- user_id にインデックス
- post_id にインデックス
- type にインデックス
- (user_id, post_id, type) に複合インデックス

### VerificationRequest

- post_id にインデックス
- user_id にインデックス
- status にインデックス
- verification_type にインデックス

### Community

- name に UNIQUE インデックス
- status にインデックス

### CommunityMembership

- user_id にインデックス
- community_id にインデックス
- (user_id, community_id) に複合インデックス

### Notification

- user_id にインデックス
- read にインデックス
- type にインデックス
- created_at にインデックス

### ImportanceScoreHistory

- post_id にインデックス
- created_at にインデックス

### ExpertiseLevelHistory

- expertise_level_id にインデックス
- user_id にインデックス
- domain にインデックス
- created_at にインデックス

## モデルライフサイクルフック

以下のライフサイクルフックをモデルに実装します：

### Post

- 作成時：初期重要度スコアの計算
- 作成時：関連するタグの保存
- 作成時：関連するコミュニティの保存
- 更新時：重要度スコアの再計算
- 削除時：関連する添付ファイルの削除

### User

- 作成時：デフォルト権限の付与
- 作成時：デフォルト設定の初期化
- 削除時：関連データの処理

### Reaction

- 作成/削除時：投稿の重要度スコア再計算

### VerificationEvaluation

- 作成時：検証リクエストのステータス更新
- 作成時：投稿の検証ステータスと重要度スコア更新

### Relationship

- 作成/削除時：関連する投稿の重要度スコア再計算

## モデルスコープ

以下のよく使用されるクエリスコープを実装します：

### Post

- published(): 公開済みの投稿のみ
- verified(): 検証済みの投稿のみ
- byImportance(): 重要度順に並べ替え
- byType($type): 特定のタイプの投稿のみ
- withTag($tag): 特定のタグを持つ投稿のみ
- inCommunity($communityId): 特定のコミュニティに属する投稿のみ

### User

- withExpertise($domain, $minLevel): 特定の専門分野で一定レベル以上のユーザーのみ
- active(): 最近活動しているユーザーのみ

### VerificationRequest

- pending(): 待機中の検証リクエストのみ
- inProgress(): 進行中の検証リクエストのみ
- byType($type): 特定のタイプの検証リクエストのみ

### Community

- active(): アクティブなコミュニティのみ
- popular(): 人気のあるコミュニティ順に並べ替え

## 実装注意点

1. 大規模データ処理

   - 重要度スコア計算などの処理は非同期ジョブとして実装
   - 関連データの取得は必要に応じて遅延ロードを活用

2. データベースパフォーマンス

   - クエリの最適化とインデックスの効果的な使用
   - N+1問題を防ぐためのリレーションの事前ロード

3. ソフトデリート

   - 重要なモデル（User, Post, Community）にはソフトデリートを実装
   - 関連データの整合性を維持するための仕組みを実装

4. JSON型の活用
   - 設定やメタデータなどの柔軟なデータ構造にはJSON型を活用
   - 必要に応じてJSONカラムに対するクエリを最適化
