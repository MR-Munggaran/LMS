<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExamResult extends Model
{
    use HasFactory;

    protected $fillable = ['exam_id', 'user_id', 'score', 'submitted_at'];

    // Relasi ke exam
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
