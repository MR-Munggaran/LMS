<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'created_by'];

    // Relasi ke user yang membuat course
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relasi ke modules
    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    // Relasi ke exams
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    // Relasi ke enrollments
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    // Relasi many-to-many ke users
    public function users()
    {
        return $this->belongsToMany(User::class, 'enrollments')
                    ->withPivot('progress')
                    ->withTimestamps();
    }
}
