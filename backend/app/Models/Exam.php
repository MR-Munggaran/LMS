<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'type', 'start_time', 'end_time'];

    // Relasi ke course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // Relasi ke results
    public function results()
    {
        return $this->hasMany(ExamResult::class);
    }

    // Relasi ke face logs
    public function faceLogs()
    {
        return $this->hasMany(FaceLog::class);
    }
}
