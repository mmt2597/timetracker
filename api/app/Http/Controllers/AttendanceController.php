<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    /**
     * Time In - Clock in for the day
     */
    public function timeIn(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'notes' => 'nullable|string|max:500',
        ]);

        $today = Carbon::today()->toDateString();
        $employeeId = $request->employee_id;

        // Check if already timed in today
        $existingAttendance = Attendance::where('employee_id', $employeeId)
            ->where('date', $today)
            ->first();

        if ($existingAttendance) {
            return response()->json([
                'success' => false,
                'message' => 'Already timed in for today',
                'data' => $existingAttendance,
            ], 400);
        }

        $timeIn = Carbon::now()->format('H:i:s');
        $expectedTime = Carbon::parse('09:00:00');
        $currentTime = Carbon::parse($timeIn);

        // Determine status based on time
        $status = 'present';
        if ($currentTime->greaterThan($expectedTime)) {
            $status = 'late';
        }

        $attendance = Attendance::create([
            'employee_id' => $employeeId,
            'date' => $today,
            'time_in' => $timeIn,
            'status' => $status,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Time in recorded successfully',
            'data' => $attendance->load('employee'),
        ], 201);
    }

    /**
     * Time Out - Clock out for the day
     */
    public function timeOut(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'notes' => 'nullable|string|max:500',
        ]);

        $today = Carbon::today()->toDateString();
        $employeeId = $request->employee_id;

        $attendance = Attendance::where('employee_id', $employeeId)
            ->where('date', $today)
            ->first();

        if (!$attendance) {
            return response()->json([
                'success' => false,
                'message' => 'No time in record found for today',
            ], 404);
        }

        if ($attendance->time_out) {
            return response()->json([
                'success' => false,
                'message' => 'Already timed out for today',
                'data' => $attendance,
            ], 400);
        }

        $attendance->update([
            'time_out' => Carbon::now()->format('H:i:s'),
            'notes' => $request->notes ?? $attendance->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Time out recorded successfully',
            'data' => $attendance->load('employee'),
        ], 200);
    }

    /**
     * Get today's attendance for an employee
     */
    public function getTodayAttendance(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);

        $today = Carbon::today()->toDateString();
        $attendance = Attendance::where('employee_id', $request->employee_id)
            ->where('date', $today)
            ->with('employee')
            ->first();

        if (!$attendance) {
            return response()->json([
                'success' => false,
                'message' => 'No attendance record found for today',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $attendance,
        ], 200);
    }

    /**
     * Get attendance history for an employee
     */
    public function getAttendanceHistory(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|in:present,absent,late,half_day,on_leave',
        ]);

        $query = Attendance::where('employee_id', $request->employee_id)
            ->with('employee');

        if ($request->start_date) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->end_date) {
            $query->where('date', '<=', $request->end_date);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $attendances = $query->orderBy('date', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $attendances->items(),
            'meta' => [
                'current_page' => $attendances->currentPage(),
                'last_page' => $attendances->lastPage(),
                'per_page' => $attendances->perPage(),
                'total' => $attendances->total(),
            ],
        ], 200);
    }

    /**
     * Get all attendance records (Admin)
     */
    public function index(Request $request)
    {
        $request->validate([
            'date' => 'nullable|date',
            'status' => 'nullable|in:present,absent,late,half_day,on_leave',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $query = Attendance::with(['employee.department', 'employee.position']);

        if ($request->date) {
            $query->where('date', $request->date);
        } else {
            // Default to today
            $query->where('date', Carbon::today()->toDateString());
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->department_id) {
            $query->whereHas('employee', function ($q) use ($request) {
                $q->where('department_id', $request->department_id);
            });
        }

        $attendances = $query->orderBy('time_in', 'asc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $attendances->items(),
            'meta' => [
                'current_page' => $attendances->currentPage(),
                'last_page' => $attendances->lastPage(),
                'per_page' => $attendances->perPage(),
                'total' => $attendances->total(),
            ],
        ], 200);
    }

    /**
     * Get attendance statistics for an employee
     */
    public function getStatistics(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'month' => 'nullable|integer|between:1,12',
            'year' => 'nullable|integer|min:2020',
        ]);

        $month = $request->month ?? Carbon::now()->month;
        $year = $request->year ?? Carbon::now()->year;

        $startDate = Carbon::create($year, $month, 1)->startOfMonth();
        $endDate = Carbon::create($year, $month, 1)->endOfMonth();

        $attendances = Attendance::where('employee_id', $request->employee_id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        $statistics = [
            'total_days' => $attendances->count(),
            'present' => $attendances->where('status', 'present')->count(),
            'late' => $attendances->where('status', 'late')->count(),
            'absent' => $attendances->where('status', 'absent')->count(),
            'half_day' => $attendances->where('status', 'half_day')->count(),
            'on_leave' => $attendances->where('status', 'on_leave')->count(),
            'total_hours' => $attendances->sum(function ($attendance) {
                if ($attendance->time_in && $attendance->time_out) {
                    $timeIn = Carbon::parse($attendance->time_in);
                    $timeOut = Carbon::parse($attendance->time_out);
                    return $timeOut->diffInHours($timeIn, true);
                }
                return 0;
            }),
        ];

        return response()->json([
            'success' => true,
            'data' => $statistics,
            'period' => [
                'month' => $month,
                'year' => $year,
            ],
        ], 200);
    }
}
