<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // problem, problem_split, solution, etc.
            $table->string('claim');
            $table->text('evidence')->nullable();
            $table->text('warrant')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('posts')->onDelete('set null');
            $table->integer('comments_count')->default(0);
            $table->json('reactions_count')->default(json_encode([
                'like' => 0,
                'agree' => 0,
                'disagree' => 0
            ]));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
