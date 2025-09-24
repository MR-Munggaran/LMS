<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'photo',       // kolom untuk cover course
        'created_by',
    ];

    protected $appends = ['photo_url']; // otomatis ikut di-serialize ke JSON

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

    // Accessor untuk photo (mirip avatar_url di User)
    public function getPhotoUrlAttribute(): string
    {
        if ($this->photo && Storage::disk('public')->exists($this->photo)) {
            return url(Storage::url($this->photo));
        }

        // default cover course (pastikan ada di public/storage/images/default-course.jpg)
        return url(Storage::url('images/default-course.jpg'));
    }
}
