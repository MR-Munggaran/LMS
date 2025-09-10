<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use App\Models\Module;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    // Tambah assignment ke module
    public function store(Request $request, $moduleId)
    {
        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date',
        ]);

        $module = Module::findOrFail($moduleId);

        $assignment = $module->assignments()->create([
            'title'       => $request->title,
            'description' => $request->description,
            'due_date'    => $request->due_date,
        ]);

        return new AssignmentResource($assignment);
    }

    // List assignment dalam module
    public function index($moduleId)
    {
        $module = Module::with('assignments')->findOrFail($moduleId);
        return AssignmentResource::collection($module->assignments);
    }

    // Detail assignment
    public function show($id)
    {
        $assignment = Assignment::with('module')->findOrFail($id);
        return new AssignmentResource($assignment);
    }

    // Update assignment
    public function update(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date',
        ]);

        $assignment->update($request->only(['title', 'description', 'due_date']));

        return new AssignmentResource($assignment);
    }

    // Hapus assignment
    public function destroy(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}
