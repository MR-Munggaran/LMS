<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Submission extends Model
{
    protected $fillable = [
        'assignment_id',
        'user_id',
        'file_path',
        'answer_text',
        'score'
    ];

    protected $appends = ['document_url'];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class, 'assignment_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDocumentUrlAttribute(): ?string
    {
        if ($this->file_path && Storage::disk('public')->exists($this->file_path)) {
            return url(Storage::url($this->file_path));
        }

        return null;
    }
}
