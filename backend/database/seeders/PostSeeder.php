<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ユーザーが存在することを確認
        $user = User::first();
        
        if (!$user) {
            // テスト用のユーザーがいなければ作成
            $user = User::create([
                'name' => 'テストユーザー',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
        }
        
        // 投稿タイプの配列
        $types = [
            'problem', 'problem_split', 'solution', 'supplement', 
            'summary', 'translation', 'estimation', 'verification', 'ethics'
        ];
        
        // 親投稿を作成
        $parentPosts = [];
        for ($i = 1; $i <= 5; $i++) {
            $post = Post::create([
                'user_id' => $user->id,
                'type' => $types[array_rand($types)],
                'claim' => '問題提起' . $i . ': これはテスト用の主張です',
                'evidence' => 'これはテスト用の根拠です。実際のデータや研究結果などがここに記載されます。',
                'warrant' => 'これはテスト用の論拠です。なぜこの根拠がこの主張を支持するのかの説明です。',
                'reactions_count' => json_encode([
                    'like' => rand(0, 50),
                    'agree' => rand(0, 30),
                    'disagree' => rand(0, 20)
                ]),
                'comments_count' => rand(0, 10),
            ]);
            
            $parentPosts[] = $post;
        }
        
        // 各親投稿に対する子投稿（返信）を作成
        foreach ($parentPosts as $parent) {
            $replyCount = rand(1, 3); // 1〜3件の返信を作成
            
            for ($i = 1; $i <= $replyCount; $i++) {
                Post::create([
                    'user_id' => $user->id,
                    'parent_id' => $parent->id,
                    'type' => $types[array_rand($types)],
                    'claim' => '返信' . $i . ': ' . $parent->claim . 'に対する検討',
                    'evidence' => 'これは返信の根拠です。元の投稿に関連するデータや考察を含みます。',
                    'warrant' => 'これは返信の論拠です。この返信がなぜ適切なのかの説明です。',
                    'reactions_count' => json_encode([
                        'like' => rand(0, 20),
                        'agree' => rand(0, 15),
                        'disagree' => rand(0, 10)
                    ]),
                    'comments_count' => rand(0, 5),
                ]);
            }
        }
    }
}
