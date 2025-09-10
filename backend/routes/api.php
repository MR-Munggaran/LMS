<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\SubmissionController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/me', [UserController::class, 'me']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    Route::post('/courses/{id}/modules', [ModuleController::class, 'store']);
    Route::get('/courses/{id}/modules', [ModuleController::class, 'index']);
    Route::get('/modules/{id}', [ModuleController::class, 'show']);
    Route::put('/modules/{id}', [ModuleController::class, 'update']);

    Route::post('/modules/{id}/assignments', [AssignmentController::class, 'store']);
    Route::get('/modules/{id}/assignments', [AssignmentController::class, 'index']);
    Route::get('/assignments/{id}', [AssignmentController::class, 'show']);
    Route::put('/assignments/{id}', [AssignmentController::class, 'update']);
    Route::delete('/assignments/{id}', [AssignmentController::class, 'destroy']);

    Route::post('/assignments/{id}/submissions', [SubmissionController::class, 'store']);
    Route::get('/assignments/{id}/submissions', [SubmissionController::class, 'index']);
    Route::put('/submissions/{id}/grade', [SubmissionController::class, 'grade']);


});