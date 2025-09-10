<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    // Tambah module ke course
    public function store(Request $request, $courseId)
    {
        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $course = Course::findOrFail($courseId);

        $module = $course->modules()->create([
            'title'   => $request->title,
            'content' => $request->content,
        ]);

        return new ModuleResource($module);
    }

    // List module dalam course
    public function index($courseId)
    {
        $course = Course::with('modules')->findOrFail($courseId);
        return ModuleResource::collection($course->modules);
    }

    // Detail module
    public function show($id)
    {
        $module = Module::with('course')->findOrFail($id);
        return new ModuleResource($module);
    }

    // Update module
    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'   => 'sometimes|string|max:255',
            'content' => 'nullable|string',
        ]);

        $module->update($request->only(['title', 'content']));

        return new ModuleResource($module);
    }

    // Hapus module
    public function destroy(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $module->delete();

        return response()->json(['message' => 'Module deleted successfully']);
    }
}
