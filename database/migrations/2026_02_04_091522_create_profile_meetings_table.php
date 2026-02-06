<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_meetings', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Primary candidate
            $table->unsignedBigInteger('profile_id');

            // Matched / opposite profile
            $table->unsignedBigInteger('matched_profile_id')->nullable();

            // RM / Admin who scheduled
            $table->unsignedBigInteger('scheduled_by')->nullable();

            // Meeting details
            $table->enum('meeting_type', ['family', 'individual']);
            $table->date('meeting_date');
            $table->time('meeting_time')->nullable();

            $table->string('venue', 120)->nullable();

            // Family members / attendees
            $table->json('attendees')->nullable();

            $table->enum('status', ['scheduled', 'completed', 'cancelled'])
                  ->default('scheduled');

            $table->string('outcome', 100)->nullable();
            $table->date('next_action_date')->nullable();

            $table->timestamp('created_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('matched_profile_id');
            $table->index('scheduled_by');
            $table->index('meeting_date');
            $table->index('status');

            // Foreign keys
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();

            $table->foreign('matched_profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->nullOnDelete();

            $table->foreign('scheduled_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_meetings');
    }
};
