# Phase 0 データベース設計

フェーズ0で必要となる最小限のデータベーステーブル設計を以下に示します。

## テーブル: users（ユーザー）

```
users
- id: integer (primary key)
- name: string (ユーザー名)
- email: string (メールアドレス、一意)
- password: string (ハッシュ化パスワード)
- remember_token: string (nullable、ログイン継続用トークン)
- created_at: timestamp
- updated_at: timestamp
```

## テーブル: posts（投稿）

```
posts
- id: integer (primary key)
- user_id: integer (foreign key -> users.id)
- type: string (投稿タイプ: 'problem', 'solution', 'supplement')
- claim: text (主張)
- evidence: text (根拠)
- reasoning: text (論拠)
- parent_id: integer (nullable, foreign key -> posts.id、親投稿)
- created_at: timestamp
- updated_at: timestamp
```

## マイグレーション実装順序

1. `create_users_table`
2. `create_posts_table`

## モデルリレーション

### Userモデル
```php
class User extends Authenticatable
{
    // ユーザーが作成した投稿
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```

### Postモデル
```php
class Post extends Model
{
    protected $fillable = [
        'type', 'claim', 'evidence', 'reasoning', 'parent_id'
    ];

    // 投稿を作成したユーザー
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 親投稿
    public function parent()
    {
        return $this->belongsTo(Post::class, 'parent_id');
    }

    // 子投稿
    public function children()
    {
        return $this->hasMany(Post::class, 'parent_id');
    }
}
```