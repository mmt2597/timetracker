<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'name',
        'shift_start',
        'shift_end',
        'break_start',
        'break_end',
        'work_days',
        'total_hours',
        'is_active',
    ];

    protected $casts = [
        'work_days' => 'array',
        'total_hours' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the employee that owns the work schedule.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Calculate total hours between shift start and end, minus break time.
     */
    public function calculateTotalHours(): float
    {
        $shiftStart = \Carbon\Carbon::parse($this->shift_start);
        $shiftEnd = \Carbon\Carbon::parse($this->shift_end);

        $totalMinutes = $shiftEnd->diffInMinutes($shiftStart);

        // Subtract break time if exists
        if ($this->break_start && $this->break_end) {
            $breakStart = \Carbon\Carbon::parse($this->break_start);
            $breakEnd = \Carbon\Carbon::parse($this->break_end);
            $breakMinutes = $breakEnd->diffInMinutes($breakStart);
            $totalMinutes -= $breakMinutes;
        }

        return round($totalMinutes / 60, 2);
    }
}
