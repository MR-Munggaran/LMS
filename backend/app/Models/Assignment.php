<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubmissionResource;
use App\Models\Assignment;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubmissionController extends Controller
{
    // Student upload tugas
    public function store(Request $request, $assignmentId)
    {
        $request->validate([
            'file' => 'nullable|file|mimes:pdf,doc,docx,zip,rar|max:2048',
            'answer_text' => 'nullable|string'
        ]);

        $assignment = Assignment::findOrFail($assignmentId);

        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('submissions', 'public');
        }

        $submission = Submission::create([
            'assignment_id' => $assignment->id,
            'user_id' => $request->user()->id,
            'file_path' => $path,
            'answer_text' => $request->answer_text,
        ]);

        return new SubmissionResource($submission);
    }

    // List submissions untuk assignment (hanya teacher/admin)
    public function index(Request $request, $assignmentId)
    {
        if (! in_array($request->user()->role->name, ['admin','teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $assignment = Assignment::with('submissions.user')->findOrFail($assignmentId);
        return SubmissionResource::collection($assignment->submissions);
    }

    // Teacher memberi nilai
    public function grade(Request $request, $id)
    {
        if (! in_array($request->user()->role->name, ['admin','teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'score' => 'required|integer|min:0|max:100'
        ]);

        $submission = Submission::findOrFail($id);
        $submission->update(['score' => $request->score]);

        return new SubmissionResource($submission);
    }
}
