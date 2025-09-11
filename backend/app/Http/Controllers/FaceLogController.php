<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaceLogResource;
use App\Models\Exam;
use App\Models\FaceLog;
use Illuminate\Http\Request;

class FaceLogController extends Controller
{
    public function verifyFace(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        $request->validate([
            'verified' => 'required|boolean',
        ]);

        $log = FaceLog::create([
            'exam_id'  => $exam->id,
            'user_id'  => $request->user()->id,
            'verified' => $request->verified,
        ]);

        return new FaceLogResource($log->load('user'));
    }

    public function faceLogs(Request $request, $id)
    {
        if (!in_array($request->user()->role->name, ['admin','teacher'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $exam = Exam::findOrFail($id);
        $logs = $exam->faceLogs()->with('user')->get();

        return FaceLogResource::collection($logs);
    }
}
