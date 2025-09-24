<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExamQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question_text',
        'question_type',
        'points',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function options()
    {
        return $this->hasMany(ExamQuestionOption::class, 'question_id');
    }
}
