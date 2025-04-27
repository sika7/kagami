# データベースマイグレーション仕様

本ドキュメントでは、SNSプラットフォームのデータベース構造を定義するためのマイグレーション仕様を記載します。

## マイグレーション一覧

以下の順序でマイグレーションを実行します。依存関係を考慮した順序になっています。

1. ユーザー関連テーブル
2. 権限管理テーブル
3. 投稿関連テーブル
4. メディア関連テーブル
5. タグ関連テーブル
6. コミュニティ関連テーブル
7. 検証関連テーブル
8. 通知関連テーブル
9. 統計関連テーブル

## マイグレーション詳細

### 1. ユーザー関連テーブル

#### create_users_table

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('profile_image')->nullable();
    $table->text('bio')->nullable();
    $table->json('settings')->nullable();
    $table->rememberToken();
    $table->timestamps();
    $table->softDeletes();
});
```

### 2. 権限管理テーブル

#### create_roles_table

```php
Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name', 50)->unique();
    $table->string('description')->nullable();
    $table->timestamps();
});
```

#### create_permissions_table

```php
Schema::create('permissions', function (Blueprint $table) {
    $table->id();
    $table->string('name', 50)->unique();
    $table->string('description')->nullable();
    $table->timestamps();
});
```

#### create_role_user_table

```php
Schema::create('role_user', function (Blueprint $table) {
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('role_id')->constrained()->onDelete('cascade');
    $table->timestamps();

    $table->primary(['user_id', 'role_id']);
});
```

#### create_permission_role_table

```php
Schema::create('permission_role', function (Blueprint $table) {
    $table->foreignId('permission_id')->constrained()->onDelete('cascade');
    $table->foreignId('role_id')->constrained()->onDelete('cascade');
    $table->timestamps();

    $table->primary(['permission_id', 'role_id']);
});
```

#### create_expertise_levels_table

```php
Schema::create('expertise_levels', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('domain', 50);
    $table->unsignedTinyInteger('level')->default(1);
    $table->decimal('score', 5, 2)->default(0);
    $table->decimal('contribution_score', 5, 2)->default(0);
    $table->decimal('verification_score', 5, 2)->default(0);
    $table->decimal('peer_score', 5, 2)->default(0);
    $table->timestamp('last_activity_at')->nullable();
    $table->timestamps();

    $table->unique(['user_id', 'domain']);
    $table->index('domain');
    $table->index('level');
});
```

### 3. 投稿関連テーブル

#### create_posts_table

```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->string('post_type', 30);
    $table->text('claim');
    $table->text('evidence');
    $table->text('reasoning');
    $table->decimal('importance_score', 6, 2)->default(0);
    $table->boolean('sensitivity')->default(false);
    $table->string('verification_status', 20)->default('pending');
    $table->string('status', 20)->default('published');
    $table->timestamps();
    $table->softDeletes();

    $table->index('user_id');
    $table->index('post_type');
    $table->index('importance_score');
    $table->index('verification_status');
    $table->index('status');
    $table->index('created_at');
});
```

#### create_relationships_table

```php
Schema::create('relationships', function (Blueprint $table) {
    $table->id();
    $table->foreignId('from_post_id')->constrained('posts')->onDelete('cascade');
    $table->foreignId('to_post_id')->constrained('posts')->onDelete('cascade');
    $table->string('relation_type', 50);
    $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
    $table->timestamps();

    $table->index('from_post_id');
    $table->index('to_post_id');
    $table->index('relation_type');
    $table->unique(['from_post_id', 'to_post_id', 'relation_type']);
});
```

#### create_reactions_table

```php
Schema::create('reactions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->string('type', 30);
    $table->timestamps();

    $table->index('user_id');
    $table->index('post_id');
    $table->index('type');
    $table->unique(['user_id', 'post_id', 'type']);
});
```

### 4. メディア関連テーブル

#### create_media_attachments_table

```php
Schema::create('media_attachments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('post_id')->nullable()->constrained()->onDelete('cascade');
    $table->string('type', 20);
    $table->string('filename');
    $table->string('original_filename');
    $table->string('file_path');
    $table->unsignedBigInteger('file_size');
    $table->string('mime_type', 100);
    $table->string('thumbnail_path')->nullable();
    $table->string('caption', 500)->nullable();
    $table->timestamps();

    $table->index('user_id');
    $table->index('post_id');
    $table->index('type');
});
```

### 5. タグ関連テーブル

#### create_tags_table

```php
Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name', 50)->unique();
    $table->timestamps();

    $table->index('name');
});
```

#### create_post_tag_table

```php
Schema::create('post_tag', function (Blueprint $table) {
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->foreignId('tag_id')->constrained()->onDelete('cascade');
    $table->timestamps();

    $table->primary(['post_id', 'tag_id']);
});
```

### 6. コミュニティ関連テーブル

#### create_communities_table

```php
Schema::create('communities', function (Blueprint $table) {
    $table->id();
    $table->string('name', 100)->unique();
    $table->text('description')->nullable();
    $table->string('icon')->nullable();
    $table->string('banner')->nullable();
    $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
    $table->string('status', 30)->default('active');
    $table->timestamps();
    $table->softDeletes();

    $table->index('name');
    $table->index('status');
});
```

#### create_community_user_table

```php
Schema::create('community_user', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('community_id')->constrained()->onDelete('cascade');
    $table->string('role', 30)->default('member');
    $table->timestamp('joined_at')->useCurrent();
    $table->timestamps();

    $table->index('user_id');
    $table->index('community_id');
    $table->unique(['user_id', 'community_id']);
});
```

#### create_community_post_table

```php
Schema::create('community_post', function (Blueprint $table) {
    $table->foreignId('community_id')->constrained()->onDelete('cascade');
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->timestamps();

    $table->primary(['community_id', 'post_id']);
});
```

#### create_categories_table

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name', 50)->unique();
    $table->string('description')->nullable();
    $table->timestamps();
});
```

#### create_category_community_table

```php
Schema::create('category_community', function (Blueprint $table) {
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->foreignId('community_id')->constrained()->onDelete('cascade');
    $table->timestamps();

    $table->primary(['category_id', 'community_id']);
});
```

### 7. 検証関連テーブル

#### create_verification_requests_table

```php
Schema::create('verification_requests', function (Blueprint $table) {
    $table->id();
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('verification_type', 30);
    $table->string('status', 30)->default('pending');
    $table->text('note')->nullable();
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();

    $table->index('post_id');
    $table->index('user_id');
    $table->index('status');
    $table->index('verification_type');
});
```

#### create_verification_evaluations_table

```php
Schema::create('verification_evaluations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('verification_request_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('evaluation_type', 30);
    $table->text('comment')->nullable();
    $table->decimal('evidence_quality', 3, 2)->nullable();
    $table->decimal('reasoning_quality', 3, 2)->nullable();
    $table->decimal('relevance', 3, 2)->nullable();
    $table->timestamps();

    $table->index('verification_request_id');
    $table->index('user_id');
    $table->index('evaluation_type');
});
```

#### create_verification_assignments_table

```php
Schema::create('verification_assignments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('verification_request_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('status', 30)->default('assigned');
    $table->timestamp('assigned_at')->useCurrent();
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();

    $table->index('verification_request_id');
    $table->index('user_id');
    $table->index('status');
    $table->unique(['verification_request_id', 'user_id']);
});
```

### 8. 通知関連テーブル

#### create_notifications_table

```php
Schema::create('notifications', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('type', 50);
    $table->json('data');
    $table->boolean('read')->default(false);
    $table->timestamps();

    $table->index('user_id');
    $table->index('read');
    $table->index('type');
    $table->index('created_at');
});
```

### 9. 統計関連テーブル

#### create_importance_score_histories_table

```php
Schema::create('importance_score_histories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('post_id')->constrained()->onDelete('cascade');
    $table->decimal('score', 6, 2);
    $table->decimal('basic_score', 6, 2);
    $table->decimal('relation_score', 6, 2);
    $table->decimal('verification_score', 6, 2);
    $table->decimal('expertise_bonus', 6, 2);
    $table->decimal('ethics_score', 6, 2);
    $table->decimal('time_decay', 4, 3);
    $table->timestamp('created_at')->useCurrent();

    $table->index('post_id');
    $table->index('created_at');
});
```

#### create_expertise_level_histories_table

```php
Schema::create('expertise_level_histories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('expertise_level_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('domain', 50);
    $table->unsignedTinyInteger('level');
    $table->decimal('score', 5, 2);
    $table->decimal('contribution_score', 5, 2);
    $table->decimal('verification_score', 5, 2);
    $table->decimal('peer_score', 5, 2);
    $table->string('reason')->nullable();
    $table->timestamp('created_at')->useCurrent();

    $table->index('expertise_level_id');
    $table->index('user_id');
    $table->index('domain');
    $table->index('created_at');
});
```

## シード（初期データ）

以下の初期データを投入します。

### 1. ロールと権限

```php
// ロール
$roles = [
    ['name' => 'admin', 'description' => 'システム管理者'],
    ['name' => 'moderator', 'description' => 'モデレーター'],
    ['name' => 'verifier', 'description' => '検証者'],
    ['name' => 'user', 'description' => '一般ユーザー']
];

// 権限
$permissions = [
    ['name' => 'manage_users', 'description' => 'ユーザー管理'],
    ['name' => 'manage_posts', 'description' => '投稿管理'],
    ['name' => 'manage_communities', 'description' => 'コミュニティ管理'],
    ['name' => 'verify_posts', 'description' => '投稿検証'],
    ['name' => 'create_post', 'description' => '投稿作成'],
    ['name' => 'edit_own_post', 'description' => '自分の投稿編集'],
    ['name' => 'delete_own_post', 'description' => '自分の投稿削除'],
    ['name' => 'create_community', 'description' => 'コミュニティ作成']
];

// ロールと権限の関連付け
$rolePermissions = [
    'admin' => [
        'manage_users', 'manage_posts', 'manage_communities', 'verify_posts',
        'create_post', 'edit_own_post', 'delete_own_post', 'create_community'
    ],
    'moderator' => [
        'manage_posts', 'verify_posts', 'create_post', 'edit_own_post',
        'delete_own_post', 'create_community'
    ],
    'verifier' => [
        'verify_posts', 'create_post', 'edit_own_post', 'delete_own_post'
    ],
    'user' => [
        'create_post', 'edit_own_post', 'delete_own_post'
    ]
];
```

### 2. カテゴリ

```php
$categories = [
    ['name' => '科学', 'description' => '科学関連のカテゴリ'],
    ['name' => '技術', 'description' => '技術関連のカテゴリ'],
    ['name' => '社会', 'description' => '社会問題関連のカテゴリ'],
    ['name' => '経済', 'description' => '経済関連のカテゴリ'],
    ['name' => '政治', 'description' => '政治関連のカテゴリ'],
    ['name' => '教育', 'description' => '教育関連のカテゴリ'],
    ['name' => '医療', 'description' => '医療関連のカテゴリ'],
    ['name' => '環境', 'description' => '環境問題関連のカテゴリ'],
    ['name' => '文化', 'description' => '文化関連のカテゴリ'],
    ['name' => 'スポーツ', 'description' => 'スポーツ関連のカテゴリ']
];
```

### 3. 管理者ユーザー

```php
$adminUser = [
    'name' => 'System Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('secure_password'),
    'email_verified_at' => now(),
    'settings' => json_encode([
        'notification_preferences' => [
            'email' => true,
            'reply' => true,
            'mention' => true,
            'verification' => true
        ],
        'privacy' => [
            'show_email' => false,
            'show_activity' => true
        ],
        'content_filter' => [
            'sensitive_content' => 'show'
        ],
        'language' => 'ja'
    ])
];
```

## インデックス最適化

全てのテーブル作成後、以下のように複合インデックスを追加します。

```php
// 検索パフォーマンス向上のための複合インデックス
Schema::table('posts', function (Blueprint $table) {
    $table->index(['post_type', 'importance_score']);
    $table->index(['verification_status', 'importance_score']);
    $table->index(['user_id', 'created_at']);
    $table->index(['status', 'created_at']);
});

Schema::table('reactions', function (Blueprint $table) {
    $table->index(['post_id', 'type', 'created_at']);
});

Schema::table('verification_requests', function (Blueprint $table) {
    $table->index(['status', 'verification_type']);
    $table->index(['post_id', 'status']);
});

Schema::table('expertise_levels', function (Blueprint $table) {
    $table->index(['domain', 'level', 'score']);
});
```

## フォーリンキー制約

全てのリレーションは適切な外部キー制約によって保護されています。

- onDelete('cascade') - 親レコードが削除された場合に子レコードも自動的に削除
- ユーザー、投稿、コミュニティなど重要なテーブルはソフトデリート（論理削除）を実装

## データ整合性確保

以下の方法でデータの整合性を確保します：

1. **トランザクション処理**

   - 複数のテーブルを更新する場合はトランザクションを使用

2. **ユニーク制約**

   - 重複データを防止するための一意制約（例：ユーザーのメールアドレス、タグ名など）

3. **NOT NULL制約**

   - 必須フィールドにはNOT NULL制約を設定

4. **デフォルト値**
   - 適切なデフォルト値を設定（例：作成日時、ステータスなど）

## パフォーマンス考慮事項

1. **インデックス戦略**

   - 頻繁に検索される列にはインデックスを設定
   - 複合インデックスを適切に使用

2. **大規模テーブル対策**

   - 将来的なデータ増加を見据えたテーブル設計
   - 大量データを扱うテーブル（投稿、リアクションなど）のパーティショニング検討（将来拡張）

3. **クエリ最適化**
   - N+1問題回避のためのリレーション設計
   - データ抽出パターンに合わせたインデックス設計
