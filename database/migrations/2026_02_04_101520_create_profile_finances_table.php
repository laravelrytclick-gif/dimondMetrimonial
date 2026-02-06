<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profile_finances', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Candidate profile
            $table->unsignedBigInteger('profile_id');

            // Package / membership details
            $table->string('package_name', 120);

            $table->decimal('amount_paid', 10, 2)->default(0.00);

            $table->date('payment_date')->nullable();

            $table->enum('payment_mode', ['Cash', 'UPI', 'Bank'])->nullable();

            $table->date('expiry_date')->nullable();

            $table->text('remarks')->nullable();

            $table->timestamp('created_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('payment_date');
            $table->index('expiry_date');

            // Foreign key
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_master_profiles')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_finances');
    }
};
