<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\AdminController;

Route::post('/login', [AuthController::class, 'login']);
// Rute dengan autentikasi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin', [AdminController::class, 'show']);
    Route::post('/admin/{id}', [AdminController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/divisions', [DivisionController::class, 'index']);
    Route::get('/employees', [EmployeesController::class, 'index']);
    Route::post('/employees', [EmployeesController::class, 'store']);
    Route::get('/employees/{id}', [EmployeesController::class, 'show']);
    Route::post('/update-employees/{id}', [EmployeesController::class, 'update']);
    Route::delete('/employees/{id}', [EmployeesController::class, 'destroy']);
    // Tambahkan rute lain yang memerlukan autentikasi di sini
});
