<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ModuleController extends Controller
{
    /**
     * Tambah module ke course
     */
    public function store(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);

        // hanya admin atau creator course
        if (
            $request->user()->role->name !== 'admin' &&
            $course->created_by !== $request->user()->id
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'nullable|string',
            'document'     => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,xls,xlsx|max:5120',
            'video_url'    => 'nullable|url',
        ]);

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('modules/documents', 'public');
        }

        $module = $course->modules()->create([
            'title'          => $request->title,
            'content'        => $request->content,
            'document_path'  => $documentPath,
            'video_url'      => $request->video_url,
        ]);

        return new ModuleResource($module->loadMissing(['course', 'assignments']));
    }

    /**
     * List module dalam course
     */
    public function index($courseId)
    {
        $course = Course::with('modules.assignments')->findOrFail($courseId);
        return ModuleResource::collection($course->modules);
    }

    /**
     * Detail module
     */
    public function show($id)
    {
        $module = Module::with(['course', 'assignments'])->findOrFail($id);
        return new ModuleResource($module);
    }

    /**
     * Update module
     */
    public function update(Request $request, $id)
    {
        $module = Module::with('course')->findOrFail($id);

        // hanya admin atau creator course
        if (
            $request->user()->role->name !== 'admin' &&
            $module->course->created_by !== $request->user()->id
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'        => 'sometimes|string|max:255',
            'content'      => 'nullable|string',
            'document'     => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,xls,xlsx|max:5120',
            'video_url'    => 'nullable|url',
        ]);

        $data = $request->only(['title', 'content', 'video_url']);

        if ($request->hasFile('document')) {
            // Hapus dokumen lama jika ada
            if ($module->document_path) {
                Storage::disk('public')->delete($module->document_path);
            }
            $data['document_path'] = $request->file('document')->store('modules/documents', 'public');
        }

        $module->update($data);

        return new ModuleResource($module->loadMissing(['course', 'assignments']));
    }

    /**
     * Hapus module
     */
    public function destroy(Request $request, $id)
    {
        $module = Module::with('course')->findOrFail($id);

        // hanya admin atau creator course
        if (
            $request->user()->role->name !== 'admin' &&
            $module->course->created_by !== $request->user()->id
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Hapus dokumen dari storage jika ada
        if ($module->document_path) {
            Storage::disk('public')->delete($module->document_path);
        }

        $module->delete();

        return response()->json(['message' => 'Module berhasil dihapus']);
    }
}