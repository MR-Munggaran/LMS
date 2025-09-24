<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Tambahkan ini untuk handling file

class CourseController extends Controller
{
    /**
     * Buat course baru (admin/teacher)
     */
    public function store(Request $request)
    {
        // ✅ hanya admin & teacher yang boleh
        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // ✅ validasi request
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // ✅ ambil field dasar
        $data = $request->only(['title', 'description']);
        $data['created_by'] = $request->user()->id;

        // ✅ simpan file photo kalau ada
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('courses', 'public');
        }

        // ✅ buat course baru
        $course = Course::create($data);

        return new CourseResource($course->load('creator'));
    }

    /**
     * List semua course
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $courses = Course::with('creator')->latest()->paginate($perPage);
        return CourseResource::collection($courses);
    }
    
    public function myteacher(Request $request)
    {
        $courses = Course::where('created_by', $request->user()->id)
            ->paginate(10);

        return CourseResource::collection($courses);
    }
    /**
     * Detail course
     */
    public function show($id)
    {
        $course = Course::with(['creator', 'modules.assignments', 'exams'])->findOrFail($id);
        return new CourseResource($course);
    }

    /**
     * Update course
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        // ✅ hanya admin atau creator yang bisa update
        if (
            $request->user()->role->name !== 'admin' &&
            $course->created_by !== $request->user()->id
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // ✅ validasi request
        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only(['title', 'description']);

        // ✅ handle upload file
        if ($request->hasFile('photo')) {
            // Hapus foto lama
            if ($course->photo && Storage::disk('public')->exists($course->photo)) {
                Storage::disk('public')->delete($course->photo);
            }

            // Simpan foto baru ke folder `courses`
            $data['photo'] = $request->file('photo')->store('courses', 'public');
        }

        $course->update($data);

        return new CourseResource($course->loadMissing('creator'));
    }

    /**
     * Hapus course
     */
    public function destroy(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        if (
            $request->user()->role->name !== 'admin' &&
            $course->created_by !== $request->user()->id
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Hapus file photo jika ada
        if ($course->photo && Storage::exists('public/courses/' . $course->photo)) {
            Storage::delete('public/courses/' . $course->photo);
        }

        $course->delete();

        return response()->json(['message' => 'Course berhasil dihapus']);
    }
}