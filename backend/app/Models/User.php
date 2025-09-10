<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name', 'email', 'password', 'face_data_path', 'role_id'
    ];

    protected $hidden = ['password', 'remember_token'];

    // Relasi ke role
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Relasi ke courses yang dibuat user (guru/admin)
    public function createdCourses()
    {
        return $this->hasMany(Course::class, 'created_by');
    }

    // Relasi ke enrollments
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    // Relasi ke courses yang di-enroll user (many-to-many lewat enrollments)
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'enrollments')
                    ->withPivot('progress')
                    ->withTimestamps();
    }

    // Relasi ke exam results
    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }

    // Relasi ke face logs
    public function faceLogs()
    {
        return $this->hasMany(FaceLog::class);
    }
}
