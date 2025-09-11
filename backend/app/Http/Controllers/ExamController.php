<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResource;
use App\Models\Course;
use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function store(Request $request, $courseId)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'      => 'required|string',
            'type'       => 'required|in:quiz,final',
            'start_time' => 'required|date',
            'end_time'   => 'required|date|after:start_time',
        ]);

        $course = Course::findOrFail($courseId);

        $exam = $course->exams()->create($request->only(['title','type','start_time','end_time']));

        return new ExamResource($exam);
    }

    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        $exams = $course->exams()->with(['results.user','faceLogs.user'])->get();

        return ExamResource::collection($exams);
    }

    public function show($id)
    {
        $exam = Exam::with(['results.user','faceLogs.user'])->findOrFail($id);
        return new ExamResource($exam);
    }

    public function update(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $exam = Exam::findOrFail($id);
        $exam->update($request->only(['title','type','start_time','end_time']));

        return new ExamResource($exam);
    }

    public function destroy(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $exam = Exam::findOrFail($id);
        $exam->delete();

        return response()->json(['message' => 'Exam deleted']);
    }
}
