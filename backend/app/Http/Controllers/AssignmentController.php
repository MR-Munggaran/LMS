<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AssignmentController extends Controller
{
    // Tambah assignment ke module
    public function store(Request $request, $moduleId)
    {
        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date_format:Y-m-d H:i',
            'document'    => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,txt|max:2048',
        ]);

        $module = Module::findOrFail($moduleId);

        // Upload dokumen jika ada
        if ($request->hasFile('document')) {
            $validated['document_path'] = $request->file('document')->store('assignments', 'public');
        }

        $assignment = $module->assignments()->create($validated);

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

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date_format:Y-m-d H:i',
            'document'    => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,txt|max:2048',
        ]);

        // Jika ada file baru, hapus file lama lalu simpan yang baru
        if ($request->hasFile('document')) {
            if ($assignment->document_path) {
                try {
                    Storage::disk('public')->delete($assignment->document_path);
                } catch (\Throwable $e) {
                    // biarkan lewat jika file memang sudah tidak ada
                }
            }
            $validated['document_path'] = $request->file('document')->store('assignments', 'public');
        }

        $assignment->update($validated);

        return new AssignmentResource($assignment);
    }

    // Hapus assignment
    public function destroy(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);

        if (! in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Hapus file jika ada
        if ($assignment->document_path) {
            try {
                Storage::disk('public')->delete($assignment->document_path);
            } catch (\Throwable $e) {
                // biarkan lewat kalau file memang sudah tidak ada
            }
        }

        $assignment->delete();

        return response()->json([
            'message' => 'Assignment deleted successfully',
            'id'      => $id,
        ]);
    }
}
