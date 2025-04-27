# 検索API仕様 (GraphQL)

## GraphQLエンドポイント

- **エンドポイント**: `POST /api/graphql`
- **説明**: GraphQLによる高度な検索・取得

## スキーマ定義

```graphql
type User {
  id: ID!
  name: String!
  email: String
  bio: String
  avatar: String
  created_at: DateTime!
  updated_at: DateTime
  followers_count: Int
  following_count: Int
  posts_count: Int
  posts(first: Int, page: Int): PostConnection
  followers(first: Int, page: Int): UserConnection
  following(first: Int, page: Int): UserConnection
}

type Post {
  id: ID!
  type: String!
  claim: String!
  evidence: String
  warrant: String
  user: User!
  parent: Post
  children(first: Int, page: Int): PostConnection
  related_posts: [Post]
  media: [Media]
  reactions_count: ReactionCount
  comments_count: Int
  comments(first: Int, page: Int): CommentConnection
  created_at: DateTime!
  updated_at: DateTime
}

type Media {
  id: ID!
  url: String!
  type: String!
  filename: String
  size: Int
  mime_type: String
  created_at: DateTime!
}

type Comment {
  id: ID!
  content: String!
  user: User!
  post: Post!
  parent: Comment
  replies(first: Int, page: Int): CommentConnection
  created_at: DateTime!
  updated_at: DateTime
}

type ReactionCount {
  like: Int
  agree: Int
  disagree: Int
}

type PostConnection {
  edges: [PostEdge]
  pageInfo: PageInfo!
  total_count: Int!
}

type PostEdge {
  node: Post
  cursor: String!
}

type UserConnection {
  edges: [UserEdge]
  pageInfo: PageInfo!
  total_count: Int!
}

type UserEdge {
  node: User
  cursor: String!
}

type CommentConnection {
  edges: [CommentEdge]
  pageInfo: PageInfo!
  total_count: Int!
}

type CommentEdge {
  node: Comment
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

input PostFilter {
  type: String
  keyword: String
  user_id: ID
  created_at_from: DateTime
  created_at_to: DateTime
}

input PostOrder {
  field: PostOrderField!
  direction: OrderDirection!
}

enum PostOrderField {
  CREATED_AT
  REACTIONS_COUNT
  COMMENTS_COUNT
}

enum OrderDirection {
  ASC
  DESC
}

type Query {
  # ユーザー関連
  user(id: ID!): User
  users(first: Int, page: Int): UserConnection

  # 投稿関連
  post(id: ID!): Post
  posts(
    first: Int
    page: Int
    filter: PostFilter
    orderBy: PostOrder
  ): PostConnection

  # ツリー関連
  postTree(root_id: ID!, depth: Int): Post

  # 関連投稿
  relatedPosts(post_id: ID!, first: Int, page: Int): PostConnection

  # 検索
  search(
    keyword: String!
    types: [String]
    first: Int
    page: Int
  ): PostConnection
}
```

## クエリ例

### 投稿検索

```graphql
query {
  posts(
    first: 10
    page: 1
    filter: {type: "問題提示", keyword: "環境問題"}
    orderBy: {field: CREATED_AT, direction: DESC}
  ) {
    edges {
      node {
        id
        type
        claim
        evidence
        warrant
        user {
          id
          name
          avatar
        }
        reactions_count {
          like
          agree
          disagree
        }
        comments_count
        created_at
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    total_count
  }
}
```

### 投稿ツリー取得

```graphql
query {
  postTree(root_id: "1", depth: 3) {
    id
    type
    claim
    user {
      id
      name
    }
    children(first: 10) {
      edges {
        node {
          id
          type
          claim
          user {
            id
            name
          }
          children(first: 10) {
            edges {
              node {
                id
                type
                claim
                user {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 関連投稿取得

```graphql
query {
  relatedPosts(post_id: "1", first: 10, page: 1) {
    edges {
      node {
        id
        type
        claim
        user {
          id
          name
        }
        created_at
      }
    }
    total_count
  }
}
```

### キーワード検索

```graphql
query {
  search(
    keyword: "環境問題"
    types: ["問題提示", "解決策提示"]
    first: 10
    page: 1
  ) {
    edges {
      node {
        id
        type
        claim
        user {
          id
          name
        }
        created_at
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    total_count
  }
}
```
