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
            'title'         => 'required|string',
            'type'          => 'required|in:quiz,final',
            'question_type' => 'required|in:multiple_choice,essay,mixed',
            'start_time'    => 'required|date',
            'end_time'      => 'required|date|after:start_time',
        ]);

        $course = Course::findOrFail($courseId);

        $exam = $course->exams()->create($request->only([
            'title','type','question_type','start_time','end_time'
        ]));

        return new ExamResource($exam);
    }

    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);

        $exams = $course->exams()
            ->with(['questions.options', 'results.user'])
            ->paginate(10);

        return ExamResource::collection($exams);
    }


    public function show($id)
    {
        $exam = Exam::with(['questions.options', 'results.user'])
            ->findOrFail($id);

        return new ExamResource($exam);
    }

    public function update(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title'         => 'sometimes|required|string',
            'type'          => 'sometimes|required|in:quiz,final',
            'question_type' => 'sometimes|required|in:multiple_choice,essay,mixed',
            'start_time'    => 'sometimes|required|date',
            'end_time'      => 'sometimes|required|date|after:start_time',
        ]);

        $exam = Exam::findOrFail($id);
        $exam->update($request->only([
            'title','type','question_type','start_time','end_time'
        ]));

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
