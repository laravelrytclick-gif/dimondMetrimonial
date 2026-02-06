<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_master_profiles', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('user_code', 20)->unique();

            $table->string('full_name', 120);
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();

            $table->date('dob')->nullable();
            $table->time('birth_time')->nullable();
            $table->string('birth_place', 120)->nullable();

            $table->string('religion', 50)->nullable();
            $table->string('caste', 50)->nullable();
            $table->string('sub_caste', 50)->nullable();
            $table->string('gotra', 50)->nullable();

            $table->string('height', 20)->nullable();
            $table->string('weight', 20)->nullable();
            $table->string('complexion', 30)->nullable();
            $table->string('blood_group', 10)->nullable();

            $table->string('eating_habit', 30)->nullable();
            $table->string('smoking_habit', 30)->nullable();
            $table->string('drinking_habit', 30)->nullable();

            $table->string('phone', 15)->nullable();
            $table->string('alternate_phone', 15)->nullable();
            $table->string('email', 100)->nullable();

            $table->text('address')->nullable();
            $table->string('city', 50)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('country', 50)->nullable();

            // snapshot fields
            $table->string('highest_education', 120)->nullable();
            $table->string('occupation', 120)->nullable();
            $table->string('income', 50)->nullable();

            $table->string('work_location', 120)->nullable();

            // Relationship
            $table->unsignedBigInteger('rm_id')->nullable();

            $table->enum('status', ['Lead', 'Active', 'Hold', 'Closed', 'Blocked'])
                  ->default('Lead');

            $table->date('registration_date')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('rm_id');
            $table->index('status');
            $table->index(['gender', 'religion', 'caste']);

            // FK (optional but recommended)
            $table->foreign('rm_id')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_master_profiles');
    }
};
