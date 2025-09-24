<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "Student $i",
                'email' => "student$i@example.com",
                'password' => Hash::make('password'),
                'role_id' => $studentRole->id,
                'jenjang_sekolah' => 'SMA',
                'asal_sekolah' => "Sekolah Student $i",
                'avatar' => null,
            ]);
        }
    }
}
