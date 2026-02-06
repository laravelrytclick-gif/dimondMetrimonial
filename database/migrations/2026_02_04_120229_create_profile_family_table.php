<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_family', function (Blueprint $table) {
            $table->id(); // BIGINT PK
            $table->unsignedBigInteger('profile_id'); // FK

            $table->enum('member_type', [
                'father',
                'mother',
                'brother',
                'sister',
                'other'
            ]);

            $table->string('name', 120)->nullable();
            $table->integer('age')->nullable();
            $table->string('occupation', 120)->nullable();
            $table->string('marital_status', 50)->nullable();
            $table->boolean('living_with_candidate')->default(false);
            $table->text('notes')->nullable();

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('profiles')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_family');
    }
};
