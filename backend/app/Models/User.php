<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        // 'face_data_path', // sementara tidak digunakan
        'role_id',
        'jenjang_sekolah',
        'asal_sekolah',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // otomatis menambahkan avatar_url ke JSON
    protected $appends = ['avatar_url'];

    /* =====================
     |  RELATIONS
     ===================== */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function createdCourses()
    {
        return $this->hasMany(Course::class, 'created_by');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'enrollments')
                    ->withPivot('progress')
                    ->withTimestamps();
    }

    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }

    /* =====================
     |  ACCESSORS
     ===================== */
    public function getAvatarUrlAttribute(): ?string
    {
        if ($this->avatar && Storage::disk('public')->exists($this->avatar)) {
            return url(Storage::url($this->avatar));
        }

        // default avatar (pastikan ada di public/storage/images/default.jpg)
        return url(Storage::url('images/default.jpg'));
    }
}
