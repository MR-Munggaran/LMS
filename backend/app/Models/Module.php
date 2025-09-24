<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'content',
        'document_path', 
        'video_url',     
    ];

    protected $appends = ['document_url', 'video_embed_url'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function getDocumentUrlAttribute(): ?string
    {
        if ($this->document_path && Storage::disk('public')->exists($this->document_path)) {
            return url(Storage::url($this->document_path));
        }

        return null;
    }

}
