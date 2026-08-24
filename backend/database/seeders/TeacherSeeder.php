<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacherRole = Role::firstOrCreate(['name' => 'teacher']);

        for ($i = 1; $i <= 10; $i++) {
            User::firstOrCreate(
                ['email' => "teacher$i@example.com"],
                [
                    'name' => "Teacher $i",
                    'password' => Hash::make('password'),
                    'role_id' => $teacherRole->id,
                    'jenjang_sekolah' => 'SMA',
                    'asal_sekolah' => "Sekolah Teacher $i",
                    'avatar' => null,
                ]
            );
        }
    }
}
