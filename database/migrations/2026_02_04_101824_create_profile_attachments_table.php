<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_attachments', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Candidate profile
            $table->unsignedBigInteger('profile_id');

            // Type of attachment
            $table->enum('category', ['photo', 'biodata', 'id']);

            $table->string('file_name', 150);
            $table->string('file_path', 255);

            // Extra info (size, mime, dimensions, etc.)
            $table->json('meta')->nullable();

            // RM / Admin who uploaded
            $table->unsignedBigInteger('uploaded_by')->nullable();

            $table->timestamp('created_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('category');
            $table->index('uploaded_by');

            // Foreign keys
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();

            $table->foreign('uploaded_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_attachments');
    }
};
