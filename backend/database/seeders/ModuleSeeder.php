<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Module;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
            $this->command->error("Tidak ada course ditemukan. Jalankan CourseSeeder dulu.");
            return;
        }

        foreach ($courses as $course) {
            // 3 module per course (idempotent via firstOrCreate)
            for ($i = 1; $i <= 3; $i++) {
                Module::firstOrCreate(
                    [
                        'course_id' => $course->id,
                        'title' => "Module $i: Materi {$i} dari {$course->title}",
                    ],
                    [
                        'content' => "Ini adalah konten pembelajaran untuk module $i dari course '{$course->title}'. Disini peserta akan mempelajari topik-topik penting terkait {$course->title}.",
                        'document_path' => null,
                        'video_url' => null,
                    ]
                );
            }
        }

        $this->command->info("Modules successfully seeded for each course!");
    }
}
