<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        // Ambil user yang role-nya admin atau teacher
        $users = User::whereIn('role', ['admin', 'teacher'])->get();
        
        if ($users->count() > 0) {
            $courses = [
                [
                    'title' => 'Laravel Fundamentals',
                    'description' => 'Belajar dasar-dasar framework Laravel untuk pengembangan web modern termasuk routing, middleware, Eloquent ORM, dan Blade templating',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Vue.js Masterclass',
                    'description' => 'Kursus lengkap tentang Vue.js untuk frontend development termasuk Vue Router, Vuex, Composition API, dan building real-world applications',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Database Design & Optimization',
                    'description' => 'Memahami konsep desain database normalisasi, indexing, query optimization, dan database management system',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'React.js Complete Guide',
                    'description' => 'Menguasai React.js dari dasar hingga advanced concepts seperti hooks, context API, Redux, dan server-side rendering',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Python for Data Science',
                    'description' => 'Belajar Python khusus untuk data science dengan libraries seperti Pandas, NumPy, Matplotlib, dan Scikit-learn',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'DevOps & CI/CD Pipeline',
                    'description' => 'Implementasi DevOps practices, Docker containerization, Kubernetes orchestration, dan continuous integration/deployment',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Mobile App Development with Flutter',
                    'description' => 'Membangun aplikasi mobile cross-platform menggunakan Flutter framework dengan Dart programming language',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Cloud Computing with AWS',
                    'description' => 'Mengenal layanan Amazon Web Services (AWS) termasuk EC2, S3, RDS, Lambda, dan architecture best practices',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'UI/UX Design Principles',
                    'description' => 'Prinsip-prinsip desain user interface dan user experience untuk membuat aplikasi yang intuitif dan engaging',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Advanced JavaScript & ES6+',
                    'description' => 'Deep dive into modern JavaScript features termasuk async/await, promises, modules, destructuring, and functional programming',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Microservices Architecture',
                    'description' => 'Desain dan implementasi microservices architecture dengan API gateway, service discovery, dan distributed systems',
                    'created_by' => $users->random()->id
                ],
                [
                    'title' => 'Cybersecurity Fundamentals',
                    'description' => 'Dasar-dasar keamanan cyber, ethical hacking, penetration testing, dan security best practices untuk developers',
                    'created_by' => $users->random()->id
                ]
            ];

            foreach ($courses as $courseData) {
                Course::create($courseData);
            }

            $this->command->info('12 courses successfully seeded!');
        } else {
            $this->command->error('No admin or teacher users found! Please seed users first.');
        }
    }
}
