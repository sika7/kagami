# API仕様書

## 概要

本ドキュメントでは、SNSプラットフォームのバックエンドAPIの仕様を定義します。APIはREST原則に基づいて設計され、一部の複雑なデータ取得にはGraphQLも使用します。

## ベースURL

```
REST API: https://api.example.com/v1
GraphQL: https://api.example.com/graphql
```

## 認証

### 認証方式

APIはJWT（JSON Web Token）ベースの認証を使用します。

#### 認証フロー

1. ユーザーはログインエンドポイントに認証情報を送信
2. 認証成功時、アクセストークンとリフレッシュトークンを取得
3. 以降のリクエストではAuthorizationヘッダーにアクセストークンを含める
4. アクセストークンの有効期限が切れた場合、リフレッシュトークンを使用して新しいトークンを取得

#### ヘッダー形式

```
Authorization: Bearer {your_access_token}
```

### 認証エンドポイント

#### ユーザー登録

```
POST /auth/register
```

**リクエスト**

```json
{
  "name": "ユーザー名",
  "email": "example@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "ユーザー登録が完了しました。確認メールを送信しました。",
  "data": {
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "example@example.com",
      "created_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### ログイン

```
POST /auth/login
```

**リクエスト**

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "ログインに成功しました",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "example@example.com",
      "created_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### トークンリフレッシュ

```
POST /auth/refresh
```

**リクエスト**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "トークンを更新しました",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

#### ログアウト

```
POST /auth/logout
```

**リクエスト**

```
Authorization: Bearer {your_access_token}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "ログアウトしました"
}
```

## RESTful API エンドポイント

### ユーザー管理

#### プロフィールの取得

```
GET /users/me
```

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "example@example.com",
      "bio": "自己紹介文",
      "profile_image": "https://example.com/images/profile/user1.jpg",
      "created_at": "2023-04-12T10:00:00Z",
      "updated_at": "2023-04-12T10:00:00Z",
      "roles": ["user"],
      "expertise_levels": [
        {
          "domain": "mathematics",
          "level": 3,
          "score": 65
        },
        {
          "domain": "physics",
          "level": 2,
          "score": 32
        }
      ],
      "settings": {
        "notification_preferences": {
          "email": true,
          "reply": true,
          "mention": true,
          "verification": true
        },
        "privacy": {
          "show_email": false,
          "show_activity": true
        },
        "content_filter": {
          "sensitive_content": "blur"
        },
        "language": "ja"
      }
    }
  }
}
```

#### プロフィールの更新

```
PUT /users/me
```

**リクエスト**

```json
{
  "name": "更新後のユーザー名",
  "bio": "更新後の自己紹介文",
  "settings": {
    "notification_preferences": {
      "email": false,
      "reply": true
    }
  }
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "プロフィールを更新しました",
  "data": {
    "user": {
      "id": 1,
      "name": "更新後のユーザー名",
      "email": "example@example.com",
      "bio": "更新後の自己紹介文",
      "profile_image": "https://example.com/images/profile/user1.jpg",
      "updated_at": "2023-04-12T11:00:00Z",
      "settings": {
        "notification_preferences": {
          "email": false,
          "reply": true,
          "mention": true,
          "verification": true
        },
        "privacy": {
          "show_email": false,
          "show_activity": true
        },
        "content_filter": {
          "sensitive_content": "blur"
        },
        "language": "ja"
      }
    }
  }
}
```

#### プロフィール画像のアップロード

```
POST /users/me/profile-image
```

**リクエスト**

マルチパートフォームデータとして画像ファイルを送信

**レスポンス**

```json
{
  "status": "success",
  "message": "プロフィール画像をアップロードしました",
  "data": {
    "profile_image": "https://example.com/images/profile/user1_updated.jpg"
  }
}
```

#### ユーザーの投稿一覧取得

```
GET /users/{user_id}/posts
```

**パラメータ**

| パラメータ | タイプ  | 必須 | 説明                                                         |
| ---------- | ------- | ---- | ------------------------------------------------------------ |
| page       | integer | 任意 | ページ番号（デフォルト: 1）                                  |
| per_page   | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）           |
| post_type  | string  | 任意 | 投稿タイプでフィルタリング（カンマ区切りで複数指定可能）     |
| sort       | string  | 任意 | ソート順（created_at:desc, created_at:asc, importance:desc） |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": 123,
        "user_id": 1,
        "title": "投稿タイトル",
        "post_type": "problem",
        "claim": "主張内容",
        "evidence": "根拠内容",
        "reasoning": "論拠内容",
        "created_at": "2023-04-12T10:00:00Z",
        "updated_at": "2023-04-12T10:00:00Z",
        "importance_score": 85.4,
        "sensitivity": false,
        "verification_status": "verified",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "profile_image": "https://example.com/images/profile/user1.jpg"
        },
        "media_attachments": [
          {
            "id": 1,
            "type": "image",
            "url": "https://example.com/uploads/images/post123_1.jpg",
            "thumbnail_url": "https://example.com/uploads/images/post123_1_thumb.jpg"
          }
        ],
        "tags": ["科学", "物理学"],
        "reactions_count": {
          "like": 15,
          "insightful": 7,
          "question": 3
        }
      }
    ],
    "pagination": {
      "total": 42,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 3,
      "links": {
        "next": "/users/1/posts?page=2"
      }
    }
  }
}
```

### 投稿管理

#### 投稿の作成

```
POST /posts
```

**リクエスト**

```json
{
  "title": "投稿タイトル",
  "post_type": "problem",
  "claim": "主張内容",
  "evidence": "根拠内容",
  "reasoning": "論拠内容",
  "sensitivity": false,
  "tags": ["科学", "物理学"],
  "communities": [1, 3],
  "media_attachments": [
    {
      "media_id": 123,
      "caption": "画像の説明"
    }
  ]
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "投稿を作成しました",
  "data": {
    "post": {
      "id": 123,
      "user_id": 1,
      "title": "投稿タイトル",
      "post_type": "problem",
      "claim": "主張内容",
      "evidence": "根拠内容",
      "reasoning": "論拠内容",
      "created_at": "2023-04-12T10:00:00Z",
      "updated_at": "2023-04-12T10:00:00Z",
      "importance_score": 0,
      "sensitivity": false,
      "verification_status": "pending",
      "user": {
        "id": 1,
        "name": "ユーザー名",
        "profile_image": "https://example.com/images/profile/user1.jpg"
      },
      "media_attachments": [
        {
          "id": 1,
          "type": "image",
          "url": "https://example.com/uploads/images/post123_1.jpg",
          "thumbnail_url": "https://example.com/uploads/images/post123_1_thumb.jpg",
          "caption": "画像の説明"
        }
      ],
      "tags": ["科学", "物理学"],
      "communities": [
        {
          "id": 1,
          "name": "物理学コミュニティ"
        },
        {
          "id": 3,
          "name": "科学一般"
        }
      ]
    }
  }
}
```

#### 投稿の取得

```
GET /posts/{post_id}
```

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "post": {
      "id": 123,
      "user_id": 1,
      "title": "投稿タイトル",
      "post_type": "problem",
      "claim": "主張内容",
      "evidence": "根拠内容",
      "reasoning": "論拠内容",
      "created_at": "2023-04-12T10:00:00Z",
      "updated_at": "2023-04-12T10:00:00Z",
      "importance_score": 85.4,
      "sensitivity": false,
      "verification_status": "verified",
      "user": {
        "id": 1,
        "name": "ユーザー名",
        "profile_image": "https://example.com/images/profile/user1.jpg"
      },
      "media_attachments": [
        {
          "id": 1,
          "type": "image",
          "url": "https://example.com/uploads/images/post123_1.jpg",
          "thumbnail_url": "https://example.com/uploads/images/post123_1_thumb.jpg",
          "caption": "画像の説明"
        }
      ],
      "tags": ["科学", "物理学"],
      "communities": [
        {
          "id": 1,
          "name": "物理学コミュニティ"
        },
        {
          "id": 3,
          "name": "科学一般"
        }
      ],
      "reactions": {
        "like": 15,
        "insightful": 7,
        "question": 3
      },
      "user_reaction": "insightful",
      "verification_details": {
        "status": "verified",
        "verified_by": [
          {
            "id": 5,
            "name": "検証者名",
            "expertise_level": 4,
            "domain": "physics"
          }
        ],
        "verification_date": "2023-04-13T15:30:00Z",
        "verification_score": 0.92
      },
      "relationships": {
        "parent_post_id": null,
        "related_posts_count": 5
      }
    }
  }
}
```

#### 投稿の更新

```
PUT /posts/{post_id}
```

**リクエスト**

```json
{
  "title": "更新後の投稿タイトル",
  "claim": "更新後の主張内容",
  "evidence": "更新後の根拠内容",
  "reasoning": "更新後の論拠内容",
  "sensitivity": true,
  "tags": ["科学", "物理学", "量子力学"],
  "communities": [1, 3, 5]
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "投稿を更新しました",
  "data": {
    "post": {
      "id": 123,
      "title": "更新後の投稿タイトル",
      "post_type": "problem",
      "claim": "更新後の主張内容",
      "evidence": "更新後の根拠内容",
      "reasoning": "更新後の論拠内容",
      "updated_at": "2023-04-12T11:00:00Z",
      "sensitivity": true,
      "tags": ["科学", "物理学", "量子力学"],
      "communities": [
        {
          "id": 1,
          "name": "物理学コミュニティ"
        },
        {
          "id": 3,
          "name": "科学一般"
        },
        {
          "id": 5,
          "name": "量子物理学"
        }
      ]
    }
  }
}
```

#### 投稿の削除

```
DELETE /posts/{post_id}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "投稿を削除しました"
}
```

#### 投稿リスト取得（フィード）

```
GET /posts
```

**パラメータ**

| パラメータ   | タイプ  | 必須 | 説明                                                         |
| ------------ | ------- | ---- | ------------------------------------------------------------ |
| page         | integer | 任意 | ページ番号（デフォルト: 1）                                  |
| per_page     | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）           |
| post_type    | string  | 任意 | 投稿タイプでフィルタリング（カンマ区切りで複数指定可能）     |
| tags         | string  | 任意 | タグでフィルタリング（カンマ区切りで複数指定可能）           |
| community_id | integer | 任意 | コミュニティIDでフィルタリング                               |
| user_id      | integer | 任意 | ユーザーIDでフィルタリング                                   |
| sort         | string  | 任意 | ソート順（created_at:desc, created_at:asc, importance:desc） |
| feed_type    | string  | 任意 | フィードタイプ（home, trending, latest, following）          |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": 123,
        "user_id": 1,
        "title": "投稿タイトル",
        "post_type": "problem",
        "claim": "主張内容",
        "evidence": "根拠内容",
        "reasoning": "論拠内容",
        "created_at": "2023-04-12T10:00:00Z",
        "updated_at": "2023-04-12T10:00:00Z",
        "importance_score": 85.4,
        "sensitivity": false,
        "verification_status": "verified",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "profile_image": "https://example.com/images/profile/user1.jpg"
        },
        "media_attachments": [
          {
            "id": 1,
            "type": "image",
            "url": "https://example.com/uploads/images/post123_1.jpg",
            "thumbnail_url": "https://example.com/uploads/images/post123_1_thumb.jpg"
          }
        ],
        "tags": ["科学", "物理学"],
        "reactions_count": {
          "like": 15,
          "insightful": 7,
          "question": 3
        },
        "user_reaction": "insightful",
        "relationships": {
          "parent_post_id": null,
          "related_posts_count": 5
        }
      }
    ],
    "pagination": {
      "total": 245,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 13,
      "links": {
        "next": "/posts?page=2"
      }
    }
  }
}
```

#### 投稿の検索

```
GET /search/posts
```

**パラメータ**

| パラメータ   | タイプ  | 必須 | 説明                                                     |
| ------------ | ------- | ---- | -------------------------------------------------------- |
| q            | string  | 必須 | 検索クエリ                                               |
| page         | integer | 任意 | ページ番号（デフォルト: 1）                              |
| per_page     | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）       |
| post_type    | string  | 任意 | 投稿タイプでフィルタリング（カンマ区切りで複数指定可能） |
| tags         | string  | 任意 | タグでフィルタリング（カンマ区切りで複数指定可能）       |
| community_id | integer | 任意 | コミュニティIDでフィルタリング                           |
| from_date    | string  | 任意 | この日付以降の投稿（ISO 8601形式）                       |
| to_date      | string  | 任意 | この日付以前の投稿（ISO 8601形式）                       |
| sort         | string  | 任意 | ソート順（relevance, created_at:desc, importance:desc）  |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": 123,
        "user_id": 1,
        "title": "投稿タイトル",
        "post_type": "problem",
        "claim": "主張内容",
        "evidence": "根拠内容",
        "reasoning": "論拠内容",
        "created_at": "2023-04-12T10:00:00Z",
        "updated_at": "2023-04-12T10:00:00Z",
        "importance_score": 85.4,
        "sensitivity": false,
        "verification_status": "verified",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "profile_image": "https://example.com/images/profile/user1.jpg"
        },
        "tags": ["科学", "物理学"],
        "reactions_count": {
          "like": 15,
          "insightful": 7,
          "question": 3
        }
      }
    ],
    "pagination": {
      "total": 42,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 3,
      "links": {
        "next": "/search/posts?q=physics&page=2"
      }
    }
  }
}
```

### メディア管理

#### メディアアップロード

```
POST /media
```

**リクエスト**

マルチパートフォームデータとしてファイルを送信

| フィールド | タイプ | 必須 | 説明                                     |
| ---------- | ------ | ---- | ---------------------------------------- |
| file       | file   | 必須 | アップロードするファイル                 |
| type       | string | 必須 | ファイルタイプ（image, document, audio） |
| caption    | string | 任意 | ファイルの説明                           |

**レスポンス**

```json
{
  "status": "success",
  "message": "メディアをアップロードしました",
  "data": {
    "media": {
      "id": 123,
      "type": "image",
      "url": "https://example.com/uploads/images/user1_1682354412.jpg",
      "thumbnail_url": "https://example.com/uploads/images/user1_1682354412_thumb.jpg",
      "caption": "ファイルの説明",
      "filename": "example.jpg",
      "filesize": 1024567,
      "created_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### メディア情報取得

```
GET /media/{media_id}
```

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "media": {
      "id": 123,
      "type": "image",
      "url": "https://example.com/uploads/images/user1_1682354412.jpg",
      "thumbnail_url": "https://example.com/uploads/images/user1_1682354412_thumb.jpg",
      "caption": "ファイルの説明",
      "filename": "example.jpg",
      "filesize": 1024567,
      "created_at": "2023-04-12T10:00:00Z",
      "user_id": 1
    }
  }
}
```

#### メディア削除

```
DELETE /media/{media_id}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "メディアを削除しました"
}
```

### インタラクション

#### リアクション追加/更新

```
POST /posts/{post_id}/reactions
```

**リクエスト**

```json
{
  "type": "insightful"
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "リアクションを追加しました",
  "data": {
    "reaction": {
      "post_id": 123,
      "user_id": 1,
      "type": "insightful",
      "created_at": "2023-04-12T10:00:00Z"
    },
    "reactions_count": {
      "like": 15,
      "insightful": 8,
      "question": 3
    }
  }
}
```

#### リアクション削除

```
DELETE /posts/{post_id}/reactions
```

**レスポンス**

```json
{
  "status": "success",
  "message": "リアクションを削除しました",
  "data": {
    "reactions_count": {
      "like": 15,
      "insightful": 7,
      "question": 3
    }
  }
}
```

#### 投稿の関連付け作成

```
POST /posts/{post_id}/relationships
```

**リクエスト**

```json
{
  "related_post_id": 456,
  "relation_type": "supplement"
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "投稿の関連付けを作成しました",
  "data": {
    "relationship": {
      "id": 789,
      "from_post_id": 123,
      "to_post_id": 456,
      "relation_type": "supplement",
      "created_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### 投稿の関連付け削除

```
DELETE /posts/{post_id}/relationships/{relationship_id}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "投稿の関連付けを削除しました"
}
```

#### 投稿に関連する投稿一覧取得

```
GET /posts/{post_id}/related
```

**パラメータ**

| パラメータ    | タイプ  | 必須 | 説明                                                     |
| ------------- | ------- | ---- | -------------------------------------------------------- |
| page          | integer | 任意 | ページ番号（デフォルト: 1）                              |
| per_page      | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）       |
| relation_type | string  | 任意 | 関係タイプでフィルタリング（カンマ区切りで複数指定可能） |
| direction     | string  | 任意 | 関係の方向（incoming, outgoing, both）デフォルト: both   |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "relationships": [
      {
        "id": 789,
        "from_post_id": 123,
        "to_post_id": 456,
        "relation_type": "supplement",
        "created_at": "2023-04-12T10:00:00Z",
        "post": {
          "id": 456,
          "user_id": 2,
          "title": "関連投稿タイトル",
          "post_type": "supplement",
          "claim": "主張内容",
          "created_at": "2023-04-11T15:30:00Z",
          "importance_score": 65.2,
          "verification_status": "verified",
          "user": {
            "id": 2,
            "name": "別のユーザー",
            "profile_image": "https://example.com/images/profile/user2.jpg"
          }
        }
      }
    ],
    "pagination": {
      "total": 5,
      "count": 5,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 1
    }
  }
}
```

### 検証プロセス

#### 検証リクエスト作成

```
POST /posts/{post_id}/verification-requests
```

**リクエスト**

```json
{
  "verification_type": "evidence",
  "note": "この証拠の妥当性を検証してほしいです"
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "検証リクエストを作成しました",
  "data": {
    "verification_request": {
      "id": 123,
      "post_id": 456,
      "user_id": 1,
      "verification_type": "evidence",
      "status": "pending",
      "note": "この証拠の妥当性を検証してほしいです",
      "created_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### 検証評価の提出

```
POST /verification-requests/{request_id}/evaluations
```

**リクエスト**

```json
{
  "evaluation_type": "positive",
  "comment": "根拠として妥当であると判断します",
  "evidence_quality": 0.85,
  "reasoning_quality": 0.9,
  "relevance": 0.95
}
```

**レスポンス**

```json
{
  "status": "success",
  "message": "検証評価を提出しました",
  "data": {
    "verification_evaluation": {
      "id": 789,
      "verification_request_id": 123,
      "user_id": 5,
      "evaluation_type": "positive",
      "comment": "根拠として妥当であると判断します",
      "evidence_quality": 0.85,
      "reasoning_quality": 0.9,
      "relevance": 0.95,
      "created_at": "2023-04-12T11:30:00Z"
    }
  }
}
```

#### 検証リクエスト一覧取得

```
GET /verification-requests
```

**パラメータ**

| パラメータ        | タイプ  | 必須 | 説明                                                          |
| ----------------- | ------- | ---- | ------------------------------------------------------------- |
| page              | integer | 任意 | ページ番号（デフォルト: 1）                                   |
| per_page          | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）            |
| status            | string  | 任意 | ステータスでフィルタリング（pending, in_progress, completed） |
| verification_type | string  | 任意 | 検証タイプでフィルタリング（evidence, reasoning, claim）      |
| domain            | string  | 任意 | 専門分野でフィルタリング                                      |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "verification_requests": [
      {
        "id": 123,
        "post_id": 456,
        "user_id": 1,
        "verification_type": "evidence",
        "status": "in_progress",
        "note": "この証拠の妥当性を検証してほしいです",
        "created_at": "2023-04-12T10:00:00Z",
        "post": {
          "id": 456,
          "title": "検証対象の投稿",
          "post_type": "problem",
          "user": {
            "id": 1,
            "name": "ユーザー名",
            "profile_image": "https://example.com/images/profile/user1.jpg"
          }
        },
        "assigned_verifiers": [
          {
            "id": 5,
            "name": "検証者名",
            "profile_image": "https://example.com/images/profile/user5.jpg",
            "expertise_level": 4,
            "domain": "physics"
          }
        ]
      }
    ],
    "pagination": {
      "total": 15,
      "count": 15,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 1
    }
  }
}
```

### コミュニティ管理

#### コミュニティ一覧取得

```
GET /communities
```

**パラメータ**

| パラメータ  | タイプ  | 必須 | 説明                                               |
| ----------- | ------- | ---- | -------------------------------------------------- |
| page        | integer | 任意 | ページ番号（デフォルト: 1）                        |
| per_page    | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100） |
| sort        | string  | 任意 | ソート順（popularity, name, created_at:desc）      |
| category_id | integer | 任意 | カテゴリIDでフィルタリング                         |
| q           | string  | 任意 | 検索クエリ                                         |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "communities": [
      {
        "id": 1,
        "name": "物理学コミュニティ",
        "description": "物理学に関する議論のためのコミュニティです",
        "icon": "https://example.com/images/communities/physics.jpg",
        "member_count": 1250,
        "post_count": 3567,
        "created_at": "2023-01-15T10:00:00Z",
        "categories": ["科学", "学術"],
        "is_member": true
      }
    ],
    "pagination": {
      "total": 124,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 7,
      "links": {
        "next": "/communities?page=2"
      }
    }
  }
}
```

#### コミュニティ詳細取得

```
GET /communities/{community_id}
```

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "community": {
      "id": 1,
      "name": "物理学コミュニティ",
      "description": "物理学に関する議論のためのコミュニティです",
      "icon": "https://example.com/images/communities/physics.jpg",
      "banner": "https://example.com/images/communities/physics_banner.jpg",
      "member_count": 1250,
      "post_count": 3567,
      "created_at": "2023-01-15T10:00:00Z",
      "updated_at": "2023-04-10T14:30:00Z",
      "categories": ["科学", "学術"],
      "is_member": true,
      "membership_status": "member",
      "recent_posts": [
        {
          "id": 123,
          "title": "最近の投稿",
          "post_type": "problem",
          "created_at": "2023-04-12T10:00:00Z",
          "user": {
            "id": 1,
            "name": "ユーザー名",
            "profile_image": "https://example.com/images/profile/user1.jpg"
          }
        }
      ],
      "popular_tags": [
        {
          "name": "量子力学",
          "count": 245
        },
        {
          "name": "相対性理論",
          "count": 182
        }
      ]
    }
  }
}
```

#### コミュニティ参加

```
POST /communities/{community_id}/join
```

**レスポンス**

```json
{
  "status": "success",
  "message": "コミュニティに参加しました",
  "data": {
    "membership": {
      "community_id": 1,
      "user_id": 5,
      "role": "member",
      "joined_at": "2023-04-12T10:00:00Z"
    }
  }
}
```

#### コミュニティ脱退

```
POST /communities/{community_id}/leave
```

**レスポンス**

```json
{
  "status": "success",
  "message": "コミュニティから脱退しました"
}
```

#### コミュニティの投稿一覧取得

```
GET /communities/{community_id}/posts
```

**パラメータ**

| パラメータ | タイプ  | 必須 | 説明                                                         |
| ---------- | ------- | ---- | ------------------------------------------------------------ |
| page       | integer | 任意 | ページ番号（デフォルト: 1）                                  |
| per_page   | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）           |
| post_type  | string  | 任意 | 投稿タイプでフィルタリング（カンマ区切りで複数指定可能）     |
| sort       | string  | 任意 | ソート順（created_at:desc, created_at:asc, importance:desc） |
| tags       | string  | 任意 | タグでフィルタリング（カンマ区切りで複数指定可能）           |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": 123,
        "user_id": 1,
        "title": "投稿タイトル",
        "post_type": "problem",
        "claim": "主張内容",
        "evidence": "根拠内容",
        "reasoning": "論拠内容",
        "created_at": "2023-04-12T10:00:00Z",
        "updated_at": "2023-04-12T10:00:00Z",
        "importance_score": 85.4,
        "sensitivity": false,
        "verification_status": "verified",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "profile_image": "https://example.com/images/profile/user1.jpg"
        },
        "tags": ["科学", "物理学"],
        "reactions_count": {
          "like": 15,
          "insightful": 7,
          "question": 3
        }
      }
    ],
    "pagination": {
      "total": 3567,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 179,
      "links": {
        "next": "/communities/1/posts?page=2"
      }
    }
  }
}
```

### 通知

#### 通知一覧取得

```
GET /notifications
```

**パラメータ**

| パラメータ  | タイプ  | 必須 | 説明                                                         |
| ----------- | ------- | ---- | ------------------------------------------------------------ |
| page        | integer | 任意 | ページ番号（デフォルト: 1）                                  |
| per_page    | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）           |
| read_status | string  | 任意 | 既読状態でフィルタリング（read, unread, all）デフォルト: all |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "notifications": [
      {
        "id": 123,
        "type": "reaction",
        "read": false,
        "created_at": "2023-04-12T10:00:00Z",
        "data": {
          "post_id": 456,
          "post_title": "投稿タイトル",
          "user_id": 2,
          "user_name": "リアクションしたユーザー",
          "user_profile_image": "https://example.com/images/profile/user2.jpg",
          "reaction_type": "insightful"
        }
      },
      {
        "id": 122,
        "type": "verification_complete",
        "read": true,
        "created_at": "2023-04-11T15:30:00Z",
        "data": {
          "post_id": 789,
          "post_title": "検証された投稿",
          "verification_status": "verified",
          "verification_score": 0.92
        }
      }
    ],
    "pagination": {
      "total": 42,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 3,
      "links": {
        "next": "/notifications?page=2"
      }
    },
    "unread_count": 5
  }
}
```

#### 通知既読設定

```
PUT /notifications/{notification_id}/read
```

**レスポンス**

```json
{
  "status": "success",
  "message": "通知を既読にしました",
  "data": {
    "unread_count": 4
  }
}
```

#### 全通知既読設定

```
PUT /notifications/read-all
```

**レスポンス**

```json
{
  "status": "success",
  "message": "すべての通知を既読にしました",
  "data": {
    "unread_count": 0
  }
}
```

### タグ管理

#### 人気タグ一覧取得

```
GET /tags/popular
```

**パラメータ**

| パラメータ   | タイプ  | 必須 | 説明                                |
| ------------ | ------- | ---- | ----------------------------------- |
| limit        | integer | 任意 | 取得数（デフォルト: 20、最大: 100） |
| community_id | integer | 任意 | コミュニティIDでフィルタリング      |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "tags": [
      {
        "name": "科学",
        "count": 1245,
        "trending_score": 95.7
      },
      {
        "name": "物理学",
        "count": 982,
        "trending_score": 87.3
      }
    ]
  }
}
```

#### タグで投稿検索

```
GET /tags/{tag_name}/posts
```

**パラメータ**

| パラメータ   | タイプ  | 必須 | 説明                                                         |
| ------------ | ------- | ---- | ------------------------------------------------------------ |
| page         | integer | 任意 | ページ番号（デフォルト: 1）                                  |
| per_page     | integer | 任意 | 1ページあたりの結果数（デフォルト: 20、最大: 100）           |
| post_type    | string  | 任意 | 投稿タイプでフィルタリング（カンマ区切りで複数指定可能）     |
| sort         | string  | 任意 | ソート順（created_at:desc, created_at:asc, importance:desc） |
| community_id | integer | 任意 | コミュニティIDでフィルタリング                               |

**レスポンス**

```json
{
  "status": "success",
  "data": {
    "tag": {
      "name": "物理学",
      "count": 982
    },
    "posts": [
      {
        "id": 123,
        "user_id": 1,
        "title": "投稿タイトル",
        "post_type": "problem",
        "claim": "主張内容",
        "evidence": "根拠内容",
        "reasoning": "論拠内容",
        "created_at": "2023-04-12T10:00:00Z",
        "updated_at": "2023-04-12T10:00:00Z",
        "importance_score": 85.4,
        "sensitivity": false,
        "verification_status": "verified",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "profile_image": "https://example.com/images/profile/user1.jpg"
        },
        "tags": ["科学", "物理学"],
        "reactions_count": {
          "like": 15,
          "insightful": 7,
          "question": 3
        }
      }
    ],
    "pagination": {
      "total": 982,
      "count": 20,
      "per_page": 20,
      "current_page": 1,
      "total_pages": 50,
      "links": {
        "next": "/tags/物理学/posts?page=2"
      }
    }
  }
}
```

## GraphQL API

GraphQLエンドポイント: `/graphql`

### 主要なクエリ

#### 投稿ツリー取得

```graphql
query GetPostTree(
  $postId: ID!
  $depth: Int = 3
  $includeRelatedPosts: Boolean = true
) {
  post(id: $postId) {
    id
    title
    postType
    claim
    evidence
    reasoning
    importanceScore
    verificationStatus
    createdAt
    user {
      id
      name
      profileImage
    }
    tags
    reactionsCount {
      like
      insightful
      question
    }
    userReaction

    # 関連する投稿（親子関係と多対多関係）
    relatedPosts(depth: $depth) {
      nodes {
        id
        title
        postType
        importanceScore
        verificationStatus
        createdAt
        user {
          id
          name
          profileImage
        }
      }
      edges {
        fromPostId
        toPostId
        relationType
        createdAt
      }
    }
  }
}
```

#### 複雑な検索クエリ

```graphql
query ComplexSearch(
  $query: String
  $postTypes: [String]
  $tags: [String]
  $communityIds: [ID]
  $fromDate: DateTime
  $toDate: DateTime
  $verificationStatus: String
  $importanceScoreMin: Float
  $sort: String = "relevance"
  $page: Int = 1
  $perPage: Int = 20
) {
  search(
    query: $query
    postTypes: $postTypes
    tags: $tags
    communityIds: $communityIds
    fromDate: $fromDate
    toDate: $toDate
    verificationStatus: $verificationStatus
    importanceScoreMin: $importanceScoreMin
    sort: $sort
    page: $page
    perPage: $perPage
  ) {
    posts {
      id
      title
      postType
      claim
      createdAt
      importanceScore
      verificationStatus
      user {
        id
        name
        profileImage
      }
      tags
      reactionsCount {
        like
        insightful
        question
      }
      relatedPostsCount
    }
    pagination {
      total
      count
      perPage
      currentPage
      totalPages
      hasNextPage
      hasPrevPage
    }
  }
}
```

#### ネットワークビュー取得

```graphql
query GetNetworkView(
  $centralPostId: ID!
  $maxNodes: Int = 100
  $depth: Int = 2
  $includeParents: Boolean = true
  $includeChildren: Boolean = true
  $includeRelated: Boolean = true
) {
  networkView(
    centralPostId: $centralPostId
    maxNodes: $maxNodes
    depth: $depth
    includeParents: $includeParents
    includeChildren: $includeChildren
    includeRelated: $includeRelated
  ) {
    nodes {
      id
      title
      postType
      importanceScore
      verificationStatus
      user {
        id
        name
      }
    }
    edges {
      fromPostId
      toPostId
      relationType
      strength
    }
    centralNode {
      id
      title
    }
    stats {
      totalNodes
      totalEdges
      maxDepth
      centralityScore
    }
  }
}
```

## エラーコード

APIレスポンスのエラー形式:

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "入力内容が不正です",
  "details": {
    "field": "email",
    "reason": "invalid_format",
    "provided": "example.com",
    "expected": "user@example.com"
  },
  "request_id": "req_7a9c83d421"
}
```

### 主要なエラーコード

| コード               | 説明                                       | HTTPステータス |
| -------------------- | ------------------------------------------ | -------------- |
| AUTHENTICATION_ERROR | 認証エラー（未認証、トークン期限切れなど） | 401            |
| AUTHORIZATION_ERROR  | 権限エラー（アクセス権限がない）           | 403            |
| RESOURCE_NOT_FOUND   | リソースが存在しない                       | 404            |
| VALIDATION_ERROR     | 入力値バリデーションエラー                 | 422            |
| RATE_LIMIT_EXCEEDED  | APIレート制限超過                          | 429            |
| SERVER_ERROR         | サーバー内部エラー                         | 500            |
| SERVICE_UNAVAILABLE  | サービス一時停止中                         | 503            |
| DUPLICATE_ENTRY      | 重複エントリー                             | 409            |
| INVALID_REQUEST      | 不正なリクエスト                           | 400            |
| MEDIA_UPLOAD_ERROR   | メディアアップロードエラー                 | 422            |

## バージョニング

API URLにバージョン番号を含めることでバージョン管理を行います（例: `/v1/posts`）。
APIの大幅な変更がある場合は、バージョン番号を増加させます。

## 利用制限

- 認証済みユーザー: 1分間に60リクエスト
- 未認証ユーザー: 1分間に30リクエスト
- レート制限超過時は`429 Too Many Requests`レスポンスを返します

レート制限情報はレスポンスヘッダに含まれます:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1682354987
```

## ウェブフック（将来拡張）

将来的に、以下のイベントタイプに対するウェブフック機能を提供予定です:

- post.created - 新しい投稿が作成された
- post.updated - 投稿が更新された
- post.verified - 投稿が検証された
- reaction.created - リアクションが追加された
- verification_request.created - 検証リクエストが作成された
- verification_request.completed - 検証リクエストが完了した

## 変更履歴

### v1.0.0（初期リリース）

- 基本的なRESTful APIエンドポイント
- 認証システム
- 投稿、ユーザー、メディア関連のエンドポイント

### v1.1.0（予定）

- GraphQL APIの追加
- 検証システムの拡張
- パフォーマンス最適化
