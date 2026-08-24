<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Semua seeder di bawah ini idempotent (firstOrCreate),
        // aman dijalankan berulang kali setiap deploy/restart.
        $this->call([
            RoleSeeder::class,
            AdminUserSeeder::class,
            TeacherSeeder::class,
            StudentSeeder::class,
            CourseSeeder::class,
            ModuleSeeder::class,
            AssignmentSeeder::class,
        ]);
    }
}
