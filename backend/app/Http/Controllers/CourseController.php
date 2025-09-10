<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Buat course baru (admin/teacher)
    public function store(Request $request)
    {
        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course = Course::create([
            'title'       => $request->title,
            'description' => $request->description,
            'created_by'  => $request->user()->id,
        ]);

        return new CourseResource($course);
    }

    // List semua course
    public function index()
    {
        return CourseResource::collection(Course::with('creator')->get());
    }

    // Detail course
    public function show($id)
    {
        $course = Course::with(['creator', 'modules'])->findOrFail($id);
        return new CourseResource($course);
    }

    // Update course
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course->update($request->only(['title', 'description']));

        return new CourseResource($course);
    }

    // Hapus course
    public function destroy(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }
}
