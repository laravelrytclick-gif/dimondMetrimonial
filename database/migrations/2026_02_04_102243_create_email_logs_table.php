<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('email_logs', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Optional profile reference
            $table->unsignedBigInteger('profile_id')->nullable();

            // Email details
            $table->string('to_email', 120);
            $table->string('subject', 200)->nullable();
            $table->string('template', 100)->nullable();

            // Provider message id (SMTP / ZeptoMail)
            $table->string('message_id', 120)->nullable();

            // Delivery status
            $table->enum('status', ['sent', 'failed', 'bounced'])->default('sent');

            $table->text('error_message')->nullable();

            $table->dateTime('sent_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('to_email');
            $table->index('status');
            $table->index('sent_at');

            // Foreign key
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_logs');
    }
};
