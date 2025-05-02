<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// 認証が不要なルート
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// 投稿関連のパブリックルート
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/{id}/tree', [PostController::class, 'getTree']);

// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    // 現在のユーザー情報取得
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // ログアウト
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // 投稿の作成、更新、削除 (認証が必要)
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});