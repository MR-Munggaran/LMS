<?php

namespace Database\Seeders;

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
            User::firstOrCreate(
                ['email' => "student$i@example.com"],
                [
                    'name' => "Student $i",
                    'password' => Hash::make('password'),
                    'role_id' => $studentRole->id,
                    'jenjang_sekolah' => 'SMA',
                    'asal_sekolah' => "Sekolah Student $i",
                    'avatar' => null,
                ]
            );
        }
    }
}
