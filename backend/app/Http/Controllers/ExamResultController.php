<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResultResource;
use App\Models\Exam;
use App\Models\ExamResult;
use App\Models\User;
use Illuminate\Http\Request;

class ExamResultController extends Controller
{
    // GET /exams/{id}/results
    public function examResults(Request $request, $examId)
    {
        if (!in_array($request->user()->role->name, ['admin','teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $exam = Exam::findOrFail($examId);
        $results = $exam->results()->with('user')->get();

        return ExamResultResource::collection($results);
    }

    // GET /users/{id}/results
    public function userResults(Request $request, $userId)
    {
        // siswa boleh lihat hasil sendiri, guru/admin boleh lihat siapa saja
        if (
            $request->user()->id != $userId &&
            !in_array($request->user()->role->name, ['admin','teacher'])
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = User::findOrFail($userId);
        $results = $user->examResults()->with('exam')->get();

        return ExamResultResource::collection($results);
    }

    // GET /results/{id}
    public function show(Request $request, $id)
    {
        $result = ExamResult::with(['exam','user'])->findOrFail($id);

        // siswa hanya boleh lihat hasil miliknya
        if (
            $request->user()->id != $result->user_id &&
            !in_array($request->user()->role->name, ['admin','teacher'])
        ) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return new ExamResultResource($result);
    }
}
