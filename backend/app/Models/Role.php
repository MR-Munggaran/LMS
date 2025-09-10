<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relasi: 1 role bisa dimiliki banyak user
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
