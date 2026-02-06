<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_dispatch_proposals', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Sender & Receiver profiles
            $table->unsignedBigInteger('sender_profile_id');
            $table->unsignedBigInteger('receiver_profile_id');

            // RM / Admin who sent proposal
            $table->unsignedBigInteger('sent_by')->nullable();

            // How proposal was sent
            $table->enum('medium', ['email', 'whatsapp', 'manual']);

            // One-sided or both-side proposal
            $table->enum('side', ['single', 'both'])->default('single');

            // Status tracking
            $table->string('proposal_status', 50)->nullable();
            // e.g. Sent, Viewed, Accepted, Rejected, On Hold

            $table->dateTime('sent_at')->useCurrent();

            // Indexes
            $table->index('sender_profile_id');
            $table->index('receiver_profile_id');
            $table->index('sent_by');
            $table->index('proposal_status');

            // Foreign keys
            $table->foreign('sender_profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();

            $table->foreign('receiver_profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();

            $table->foreign('sent_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_dispatch_proposals');
    }
};
