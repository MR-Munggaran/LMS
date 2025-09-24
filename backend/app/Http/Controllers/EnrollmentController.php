<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\EnrollmentResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class EnrollmentController extends Controller
{
    /**
     * POST /courses/{id}/enroll
     * Student daftar ke course.
     */
    public function enroll(Request $request, $courseId)
    {
        try {
            $user = $request->user(); // user dari auth

            $course = Course::findOrFail($courseId);

            // Cek apakah sudah terdaftar
            $existing = Enrollment::where('user_id', $user->id)
                ->where('course_id', $course->id)
                ->first();

            if ($existing) {
                return response()->json([
                    'message' => 'You are already enrolled in this course.',
                    'data'    => new EnrollmentResource($existing),
                ], 200);
            }

            $enrollment = Enrollment::create([
                'user_id'   => $user->id,
                'course_id' => $course->id,
                'progress'  => 0,
            ]);

            return new EnrollmentResource($enrollment->load(['user', 'course']));
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Course not found.'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to enroll.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * GET /users/{id}/enrollments
     * Daftar course yang diikuti user (paginate).
     */
    public function userEnrollments(Request $request, $userId)
    {
        try {
            $user = User::findOrFail($userId);

            // ambil parameter ?per_page=10 (default 10)
            $perPage = $request->get('per_page', 10);

            $enrollments = Enrollment::with(['course', 'user'])
                ->where('user_id', $user->id)
                ->paginate($perPage);

            return EnrollmentResource::collection($enrollments)
                ->additional([
                    'meta' => [
                        'current_page' => $enrollments->currentPage(),
                        'last_page'    => $enrollments->lastPage(),
                        'per_page'     => $enrollments->perPage(),
                        'total'        => $enrollments->total(),
                    ],
                ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found.'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to get enrollments.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * PUT /enrollments/{id}/progress
     * Update progress belajar.
     */
    public function updateProgress(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'progress' => 'required|integer|min:0|max:100',
            ]);

            $enrollment = Enrollment::findOrFail($id);

            $enrollment->progress = $validated['progress'];
            $enrollment->save();

            return new EnrollmentResource($enrollment->load(['user', 'course']));
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Enrollment not found.'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update progress.', 'error' => $e->getMessage()], 500);
        }
    }
}
