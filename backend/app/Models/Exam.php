<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'type',
        'question_type', // tambahin disini
        'start_time',
        'end_time',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function results()
    {
        return $this->hasMany(ExamResult::class);
    }
    
    public function questions()
    {
        return $this->hasMany(ExamQuestion::class);
    }
}
