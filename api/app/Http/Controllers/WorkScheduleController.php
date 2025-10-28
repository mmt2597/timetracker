<?php

namespace App\Http\Controllers;

use App\Models\WorkSchedule;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WorkScheduleController extends Controller
{
    /**
     * Display a listing of work schedules.
     */
    public function index(Request $request): JsonResponse
    {
        $query = WorkSchedule::with('employee');

        // Filter by employee
        if ($request->has('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        // Filter by active status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $schedules = $query->latest()->get();

        return response()->json([
            'data' => $schedules
        ]);
    }

    /**
     * Store a newly created work schedule.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'name' => 'nullable|string|max:255',
            'shift_start' => 'required|date_format:H:i',
            'shift_end' => 'required|date_format:H:i|after:shift_start',
            'break_start' => 'nullable|date_format:H:i',
            'break_end' => 'nullable|date_format:H:i|after:break_start',
            'work_days' => 'required|array',
            'work_days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'is_active' => 'boolean',
        ]);

        // Calculate total hours
        $schedule = new WorkSchedule($validated);
        $totalHours = $schedule->calculateTotalHours();
        $validated['total_hours'] = $totalHours;

        // If setting as active, deactivate other schedules for this employee
        if ($request->boolean('is_active', true)) {
            WorkSchedule::where('employee_id', $validated['employee_id'])
                ->update(['is_active' => false]);
        }

        $schedule = WorkSchedule::create($validated);
        $schedule->load('employee');

        return response()->json([
            'data' => $schedule,
            'message' => 'Work schedule created successfully'
        ], 201);
    }

    /**
     * Display the specified work schedule.
     */
    public function show(WorkSchedule $workSchedule): JsonResponse
    {
        $workSchedule->load('employee');

        return response()->json([
            'data' => $workSchedule
        ]);
    }

    /**
     * Update the specified work schedule.
     */
    public function update(Request $request, WorkSchedule $workSchedule): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'shift_start' => 'sometimes|required|date_format:H:i',
            'shift_end' => 'sometimes|required|date_format:H:i|after:shift_start',
            'break_start' => 'nullable|date_format:H:i',
            'break_end' => 'nullable|date_format:H:i|after:break_start',
            'work_days' => 'sometimes|required|array',
            'work_days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'is_active' => 'boolean',
        ]);

        // If setting as active, deactivate other schedules for this employee
        if ($request->has('is_active') && $request->boolean('is_active')) {
            WorkSchedule::where('employee_id', $workSchedule->employee_id)
                ->where('id', '!=', $workSchedule->id)
                ->update(['is_active' => false]);
        }

        $workSchedule->update($validated);

        // Recalculate total hours if shift times changed
        if ($request->has('shift_start') || $request->has('shift_end') ||
            $request->has('break_start') || $request->has('break_end')) {
            $totalHours = $workSchedule->calculateTotalHours();
            $workSchedule->update(['total_hours' => $totalHours]);
        }

        $workSchedule->load('employee');

        return response()->json([
            'data' => $workSchedule,
            'message' => 'Work schedule updated successfully'
        ]);
    }

    /**
     * Remove the specified work schedule.
     */
    public function destroy(WorkSchedule $workSchedule): JsonResponse
    {
        $workSchedule->delete();

        return response()->json([
            'message' => 'Work schedule deleted successfully'
        ]);
    }

    /**
     * Get the active work schedule for an employee.
     */
    public function getActiveSchedule(Request $request): JsonResponse
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id'
        ]);

        $schedule = WorkSchedule::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->with('employee')
            ->first();

        if (!$schedule) {
            return response()->json([
                'message' => 'No active schedule found'
            ], 404);
        }

        return response()->json([
            'data' => $schedule
        ]);
    }
}
