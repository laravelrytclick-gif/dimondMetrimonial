<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_calls_followups', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Candidate profile
            $table->unsignedBigInteger('profile_id');

            // Call / interaction type
            $table->enum('call_type', ['call', 'whatsapp', 'visit']);

            // Outcome of interaction
            $table->string('call_status', 50)->nullable(); 
            // e.g. Connected, Not Answered, Interested, Busy, Follow-up Required

            $table->text('remarks')->nullable();

            // Reminder / next action
            $table->dateTime('followup_date')->nullable();

            // RM / Admin who performed action
            $table->unsignedBigInteger('performed_by')->nullable();

            $table->timestamp('created_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('performed_by');
            $table->index('followup_date');

            // Foreign keys
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();

            $table->foreign('performed_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_calls_followups');
    }
};
