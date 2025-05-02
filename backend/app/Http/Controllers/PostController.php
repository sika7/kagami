<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1|max:50',
            'type' => 'string|in:problem,problem_split,solution,supplement,summary,translation,estimation,verification,ethics',
            'search' => 'string|nullable',
            'sort' => 'string|in:latest,popular',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid parameters', 'errors' => $validator->errors()], 422);
        }

        $perPage = $request->input('per_page', 10);
        $query = Post::with('user')->latest();

        // Type filter
        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        // Search filter
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('claim', 'like', "%{$search}%")
                  ->orWhere('evidence', 'like', "%{$search}%")
                  ->orWhere('warrant', 'like', "%{$search}%");
            });
        }

        // Sorting
        if ($request->input('sort') === 'popular') {
            // Sort by total reactions (would be more complex in a real application)
            $query->orderByRaw('JSON_EXTRACT(reactions_count, "$.like") + JSON_EXTRACT(reactions_count, "$.agree") DESC');
        }

        $posts = $query->paginate($perPage);

        return response()->json([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:problem,problem_split,solution,supplement,summary,translation,estimation,verification,ethics',
            'claim' => 'required|string|max:255',
            'evidence' => 'nullable|string',
            'warrant' => 'nullable|string',
            'parent_id' => 'nullable|exists:posts,id',
            'related_post_ids' => 'nullable|array',
            'related_post_ids.*' => 'exists:posts,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $post = new Post();
        $post->user_id = Auth::id();
        $post->type = $request->input('type');
        $post->claim = $request->input('claim');
        $post->evidence = $request->input('evidence');
        $post->warrant = $request->input('warrant');
        $post->parent_id = $request->input('parent_id');
        $post->save();

        // Return the post with the user information
        $post->load('user');

        return response()->json($post, 201);
    }

    /**
     * Display the specified post.
     */
    public function show(string $id): JsonResponse
    {
        $post = Post::with(['user'])->findOrFail($id);

        // Get related posts for the detail view
        $relatedPosts = [];
        if ($post->parent_id) {
            $parent = Post::select('id', 'type', 'claim')->find($post->parent_id);
            if ($parent) {
                $relatedPosts[] = $parent;
            }
        }

        $children = Post::select('id', 'type', 'claim')
            ->where('parent_id', $post->id)
            ->get();

        foreach ($children as $child) {
            $relatedPosts[] = $child;
        }

        $result = $post->toArray();
        $result['related_posts'] = $relatedPosts;

        return response()->json($result);
    }

    /**
     * Update the specified post.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $post = Post::findOrFail($id);

        // Check if the authenticated user is the owner of the post
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'string|in:problem,problem_split,solution,supplement,summary,translation,estimation,verification,ethics',
            'claim' => 'string|max:255',
            'evidence' => 'nullable|string',
            'warrant' => 'nullable|string',
            'related_post_ids' => 'nullable|array',
            'related_post_ids.*' => 'exists:posts,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $post->fill($request->only([
            'type',
            'claim',
            'evidence',
            'warrant',
        ]));

        $post->save();

        // Return the updated post with the user information
        $post->load('user');

        return response()->json($post);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(string $id): JsonResponse
    {
        $post = Post::findOrFail($id);

        // Check if the authenticated user is the owner of the post
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    /**
     * Get a tree of posts starting from a given post.
     */
    public function getTree(string $id, Request $request): JsonResponse
    {
        $depth = $request->input('depth', 3);
        $post = Post::with('user:id,name')->findOrFail($id);
        
        $tree = $this->buildPostTree($post, $depth);
        
        return response()->json($tree);
    }

    /**
     * Recursively build a tree of posts.
     */
    private function buildPostTree(Post $post, int $depth, int $currentDepth = 0)
    {
        $treeNode = [
            'id' => $post->id,
            'type' => $post->type,
            'claim' => $post->claim,
            'user' => [
                'id' => $post->user->id,
                'name' => $post->user->name,
            ],
            'children' => [],
        ];

        // Stop recursion if we've reached the maximum depth
        if ($currentDepth >= $depth) {
            return $treeNode;
        }

        // Get all child posts
        $children = Post::with('user:id,name')
            ->where('parent_id', $post->id)
            ->get();

        foreach ($children as $child) {
            $treeNode['children'][] = $this->buildPostTree($child, $depth, $currentDepth + 1);
        }

        return $treeNode;
    }
}
