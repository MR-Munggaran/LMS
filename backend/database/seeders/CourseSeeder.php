<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil user yang role-nya teacher
        $teachers = User::where('role_id', function ($query) {
            $query->select('id')->from('roles')->where('name', 'teacher');
        })->get();

        if ($teachers->isEmpty()) {
            $this->command->error('Tidak ada teacher ditemukan! Jalankan TeacherSeeder dulu.');
            return;
        }

        $courses = [
            ['title' => 'Laravel Fundamentals', 'description' => 'Belajar dasar-dasar framework Laravel untuk pengembangan web modern termasuk routing, middleware, Eloquent ORM, dan Blade templating'],
            ['title' => 'Vue.js Masterclass', 'description' => 'Kursus lengkap tentang Vue.js untuk frontend development termasuk Vue Router, Vuex, Composition API, dan building real-world applications'],
            ['title' => 'Database Design & Optimization', 'description' => 'Memahami konsep desain database normalisasi, indexing, query optimization, dan database management system'],
            ['title' => 'React.js Complete Guide', 'description' => 'Menguasai React.js dari dasar hingga advanced concepts seperti hooks, context API, Redux, dan server-side rendering'],
            ['title' => 'Python for Data Science', 'description' => 'Belajar Python khusus untuk data science dengan libraries seperti Pandas, NumPy, Matplotlib, dan Scikit-learn'],
            ['title' => 'DevOps & CI/CD Pipeline', 'description' => 'Implementasi DevOps practices, Docker containerization, Kubernetes orchestration, dan continuous integration/deployment'],
            ['title' => 'Mobile App Development with Flutter', 'description' => 'Membangun aplikasi mobile cross-platform menggunakan Flutter framework dengan Dart programming language'],
            ['title' => 'Cloud Computing with AWS', 'description' => 'Mengenal layanan Amazon Web Services (AWS) termasuk EC2, S3, RDS, Lambda, dan architecture best practices'],
            ['title' => 'UI/UX Design Principles', 'description' => 'Prinsip-prinsip desain user interface dan user experience untuk membuat aplikasi yang intuitif dan engaging'],
            ['title' => 'Advanced JavaScript & ES6+', 'description' => 'Deep dive into modern JavaScript features termasuk async/await, promises, modules, destructuring, and functional programming'],
            ['title' => 'Microservices Architecture', 'description' => 'Desain dan implementasi microservices architecture dengan API gateway, service discovery, dan distributed systems'],
            ['title' => 'Cybersecurity Fundamentals', 'description' => 'Dasar-dasar keamanan cyber, ethical hacking, penetration testing, dan security best practices untuk developers'],
        ];

        foreach ($courses as $index => $courseData) {
            Course::firstOrCreate(
                ['title' => $courseData['title']],
                [
                    'description' => $courseData['description'],
                    // distribusi merata & deterministik ke teacher
                    'created_by' => $teachers[$index % $teachers->count()]->id,
                ]
            );
        }

        $this->command->info('12 courses successfully seeded!');
    }
}
