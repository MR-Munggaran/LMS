<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title',
        'description',
        'document_path',
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    // Relasi ke module
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
    
    public function submissions()
    {
        return $this->hasMany(Submission::class, 'assignment_id');
    }
    /**
     * Accessor untuk due_date agar otomatis diformat.
     * Hasilnya akan menggantikan nilai asli saat dipanggil di API.
     */
    public function getDueDateAttribute($value)
    {
        return $value
            ? Carbon::parse($value)->format('Y-m-d H:i')
            : null;
    }
}
