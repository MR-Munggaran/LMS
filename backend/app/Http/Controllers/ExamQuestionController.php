<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamQuestion;
use \App\Http\Resources\ExamQuestionResource;
use Illuminate\Http\Request;

class ExamQuestionController extends Controller
{
    // Tambah soal ke ujian
    public function store(Request $request, $examId)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'question_text'  => 'required|string',
            'question_type'  => 'required|in:multiple_choice,essay',
            'options'        => 'nullable|array',
            'options.*.option_text' => 'required_with:options|string',
            'options.*.is_correct'  => 'boolean',
        ]);




        $exam = Exam::findOrFail($examId);

        $question = $exam->questions()->create([
            'question_text'  => $request->question_text,
            'question_type'  => $request->question_type,
        ]);

        // simpan opsi kalau tipe multiple choice
        if ($request->question_type === 'multiple_choice' && $request->options) {
            foreach ($request->options as $option) {
                $question->options()->create([
                    'option_text' => $option['option_text'],
                    'is_correct'  => $option['is_correct'] ?? false,
                ]);
            }
        }

        return response()->json(new \App\Http\Resources\ExamQuestionResource(
            $question->load('options')
        ), 201);
    }

    // Update soal
    public function update(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $question = ExamQuestion::findOrFail($id);

        $request->validate([
            'question_text'  => 'sometimes|string',
            'question_type'  => 'sometimes|in:multiple_choice,essay',
            'options'        => 'nullable|array',
            'options.*.option_text' => 'required_with:options|string',
            'options.*.is_correct'  => 'boolean',
        ]);

        $question->update($request->only(['question_text', 'question_type']));


        // kalau ada opsi dikirim, replace semua
        if ($request->has('options')) {
            $question->options()->delete();
            foreach ($request->options as $option) {
                $question->options()->create([
                    'option_text' => $option['option_text'],
                    'is_correct'  => $option['is_correct'] ?? false,
                ]);
            }
        }

        return response()->json(new ExamQuestionResource(
            $question->load('options')
        ));
    }

    public function index($examId)
    {
        $exam = Exam::findOrFail($examId);

        // paginate langsung di relasi questions
        $questions = $exam->questions()->with('options')->paginate(10);

        return response()->json([
            'exam' => $exam->title,
            'questions' => ExamQuestionResource::collection($questions),
            'meta' => [
                'current_page' => $questions->currentPage(),
                'last_page' => $questions->lastPage(),
                'per_page' => $questions->perPage(),
                'total' => $questions->total(),
            ]
        ]);
    }

    // Tampilkan detail satu soal
    public function show($id)
    {
        $question = ExamQuestion::with('options')->findOrFail($id);

        return response()->json(new ExamQuestionResource($question));
    }


    // Hapus soal
    public function destroy(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $question = ExamQuestion::findOrFail($id);
        $question->options()->delete(); // hapus opsi juga
        $question->delete();

        return response()->json(['message' => 'Question deleted']);
    }
}
