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
        $exam = Exam::with('questions.options')->findOrFail($id);
        $answers = $request->input('answers', []);

        $correct = 0;
        $total   = $exam->questions->count();

        foreach ($exam->questions as $question) {
            $answer = collect($answers)->firstWhere('question_id', $question->id);

            if ($question->question_type === 'multiple_choice' && $answer) {
                $selectedOption = $question->options->firstWhere('id', $answer['option_id']);
                if ($selectedOption && $selectedOption->is_correct) {
                    $correct++;
                }
            }

            if ($question->question_type === 'essay' && $answer) {
                // TODO: manual check essay
            }
        }

        // hitung score, misalnya pakai persentase
        $score = $total > 0 ? round(($correct / $total) * 100) : 0;

        $result = ExamResult::create([
            'exam_id'      => $exam->id,
            'user_id'      => $request->user()->id,
            'score'        => $score,
            'submitted_at' => now(),
        ]);

        return (new ExamResultResource($result->load('user')))->additional([
            'meta' => [
                'correct' => $correct,
                'wrong'   => $total - $correct,
                'total'   => $total,
            ],
        ]);
    }



}
