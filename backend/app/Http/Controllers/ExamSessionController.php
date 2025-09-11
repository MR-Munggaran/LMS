<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResultResource;
use App\Models\Exam;
use App\Models\ExamResult;
use Illuminate\Http\Request;

class ExamSessionController extends Controller
{
    public function start(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        if (now()->lt($exam->start_time) || now()->gt($exam->end_time)) {
            return response()->json(['message' => 'Exam not available at this time'], 403);
        }

        return response()->json(['message' => 'Exam session started', 'exam_id' => $exam->id]);
    }

    public function submit(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        $request->validate([
            'score' => 'required|numeric|min:0|max:100',
        ]);

        $result = ExamResult::create([
            'exam_id'     => $exam->id,
            'user_id'     => $request->user()->id,
            'score'       => $request->score,
            'submitted_at'=> now(),
        ]);

        return new ExamResultResource($result->load('user'));
    }
}
