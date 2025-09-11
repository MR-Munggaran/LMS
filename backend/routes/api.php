<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamSessionController;
use App\Http\Controllers\FaceLogController;
use App\Http\Controllers\ExamResultController;
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

    Route::post('/courses/{id}/exams', [ExamController::class, 'store']);
    Route::get('/courses/{id}/exams', [ExamController::class, 'index']);
    Route::get('/exams/{id}', [ExamController::class, 'show']);
    Route::put('/exams/{id}', [ExamController::class, 'update']);
    Route::delete('/exams/{id}', [ExamController::class, 'destroy']);

    Route::post('/exams/{id}/start', [ExamSessionController::class, 'start']);
    Route::post('/exams/{id}/submit', [ExamSessionController::class, 'submit']);

    Route::post('/exams/{id}/verify-face', [FaceLogController::class, 'verifyFace']);
    Route::get('/exams/{id}/face-logs', [FaceLogController::class, 'faceLogs']);

    Route::get('/exams/{id}/results', [ExamResultController::class, 'examResults']);
    Route::get('/users/{id}/results', [ExamResultController::class, 'userResults']);
    Route::get('/results/{id}', [ExamResultController::class, 'show']);

});