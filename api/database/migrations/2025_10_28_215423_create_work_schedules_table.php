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
        Schema::create('work_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('name')->default('Default Schedule'); // Schedule name

            // Shift times
            $table->time('shift_start'); // e.g., 08:00:00
            $table->time('shift_end');   // e.g., 17:00:00

            // Break times
            $table->time('break_start')->nullable(); // e.g., 12:00:00
            $table->time('break_end')->nullable();   // e.g., 13:00:00

            // Work days (JSON array of days: ["monday", "tuesday", ...])
            $table->json('work_days');

            // Total hours per day
            $table->decimal('total_hours', 4, 2); // e.g., 8.00

            // Active status
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_schedules');
    }
};
