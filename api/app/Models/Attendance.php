<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'date',
        'time_in',
        'time_out',
        'status',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'time_in' => 'datetime:H:i:s',
        'time_out' => 'datetime:H:i:s',
    ];

    /**
     * Get the employee that owns the attendance
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Calculate total hours worked
     */
    public function getTotalHoursAttribute()
    {
        if (!$this->time_in || !$this->time_out) {
            return null;
        }

        $timeIn = \Carbon\Carbon::parse($this->time_in);
        $timeOut = \Carbon\Carbon::parse($this->time_out);

        return $timeOut->diffInHours($timeIn, true);
    }

    /**
     * Check if employee is late (after 9:00 AM)
     */
    public function isLate()
    {
        if (!$this->time_in) {
            return false;
        }

        $timeIn = \Carbon\Carbon::parse($this->time_in);
        $expectedTime = \Carbon\Carbon::parse('09:00:00');

        return $timeIn->greaterThan($expectedTime);
    }
}
