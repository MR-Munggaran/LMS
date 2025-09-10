<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FaceLog extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'exam_id', 'verified'];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke exam
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
