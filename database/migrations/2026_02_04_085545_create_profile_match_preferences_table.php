<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_match_preferences', function (Blueprint $table) {
            $table->bigIncrements('id');

            // FK to user_master_profiles
            $table->unsignedBigInteger('profile_id');

            // Flexible preference storage
            $table->json('preferences');

            $table->text('comments')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('profile_id');

            // Foreign key
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_match_preferences');
    }
};
