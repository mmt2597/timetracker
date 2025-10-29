<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\WorkScheduleController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routesw
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Employee routes
    Route::get('/employees/statistics', [EmployeeController::class, 'statistics']);

    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('positions', PositionController::class);

    // Attendance routes
    Route::prefix('attendance')->group(function () {
        // Employee time in/out
        Route::post('/time-in', [AttendanceController::class, 'timeIn']);
        Route::post('/time-out', [AttendanceController::class, 'timeOut']);

        // Get today's attendance
        Route::get('/today', [AttendanceController::class, 'getTodayAttendance']);

        // Get attendance history
        Route::get('/history', [AttendanceController::class, 'getAttendanceHistory']);

        // Get attendance statistics
        Route::get('/statistics', [AttendanceController::class, 'getStatistics']);

        // Admin: Get all attendance records
        Route::get('/', [AttendanceController::class, 'index']);
    });

    // Work Schedule routes
    Route::prefix('work-schedules')->group(function () {
        // Get active schedule for an employee
        Route::get('/active', [WorkScheduleController::class, 'getActiveSchedule']);

        // CRUD operations
        Route::get('/', [WorkScheduleController::class, 'index']);
        Route::post('/', [WorkScheduleController::class, 'store']);
        Route::get('/{workSchedule}', [WorkScheduleController::class, 'show']);
        Route::put('/{workSchedule}', [WorkScheduleController::class, 'update']);
        Route::delete('/{workSchedule}', [WorkScheduleController::class, 'destroy']);
    });
});
