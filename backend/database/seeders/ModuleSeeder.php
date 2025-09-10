<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Module;
use App\Models\Course;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::where('id', '>=', 2)->get();

        if ($courses->count() > 0) {
            $modules = [
                // Module untuk course_id 2 (Vue.js Masterclass)
                [
                    'course_id' => 2,
                    'title' => 'Introduction to Vue.js',
                    'content' => 'Pengenalan Vue.js, reactive data binding, dan dasar-dasar Vue instance. Memahami konsep MVVM pattern.'
                ],
                [
                    'course_id' => 2,
                    'title' => 'Vue Components',
                    'content' => 'Membuat dan menggunakan components dalam Vue.js application. Props, events, dan component communication.'
                ],
                [
                    'course_id' => 2,
                    'title' => 'Vue Router',
                    'content' => 'Implementasi routing dalam Vue.js application dengan Vue Router.'
                ],

                // Module untuk course_id 3 (Database Design)
                [
                    'course_id' => 3,
                    'title' => 'Database Concepts',
                    'content' => 'Konsep dasar database, relational database, dan SQL fundamentals.'
                ],
                [
                    'course_id' => 3,
                    'title' => 'Normalization Techniques',
                    'content' => 'Teknik normalisasi database (1NF, 2NF, 3NF) untuk menghindari redundancy dan anomaly.'
                ],
                [
                    'course_id' => 3,
                    'title' => 'Indexing & Optimization',
                    'content' => 'Database indexing strategies dan query optimization techniques.'
                ],

                // Module untuk course_id 4 (React.js Complete Guide)
                [
                    'course_id' => 4,
                    'title' => 'React Basics & JSX',
                    'content' => 'Dasar-dasar React, JSX syntax, components, props, dan state management.'
                ],
                [
                    'course_id' => 4,
                    'title' => 'React Hooks',
                    'content' => 'Menggunakan useState, useEffect, useContext, dan custom hooks dalam React.'
                ],
                [
                    'course_id' => 4,
                    'title' => 'State Management with Redux',
                    'content' => 'Implementasi Redux untuk global state management dalam React applications.'
                ],

                // Module untuk course_id 5 (Python for Data Science)
                [
                    'course_id' => 5,
                    'title' => 'Python Fundamentals',
                    'content' => 'Dasar-dasar pemrograman Python untuk data science: variables, data types, loops, functions.'
                ],
                [
                    'course_id' => 5,
                    'title' => 'Pandas Library',
                    'content' => 'Menggunakan Pandas untuk data manipulation, cleaning, dan analysis.'
                ],
                [
                    'course_id' => 5,
                    'title' => 'Data Visualization',
                    'content' => 'Visualisasi data dengan Matplotlib dan Seaborn libraries.'
                ],

                // Module untuk course_id 6 (DevOps & CI/CD)
                [
                    'course_id' => 6,
                    'title' => 'Introduction to DevOps',
                    'content' => 'Konsep dasar DevOps culture, practices, dan benefits dalam software development.'
                ],
                [
                    'course_id' => 6,
                    'title' => 'Docker Containerization',
                    'content' => 'Menggunakan Docker untuk containerization dan deployment.'
                ],

                // Module untuk course_id 7 (Mobile App with Flutter)
                [
                    'course_id' => 7,
                    'title' => 'Flutter Basics',
                    'content' => 'Dasar-dasar Flutter framework dan Dart programming language.'
                ],
                [
                    'course_id' => 7,
                    'title' => 'Flutter Widgets',
                    'content' => 'Menggunakan basic dan advanced widgets dalam Flutter development.'
                ],

                // Module untuk course_id 8 (Cloud Computing with AWS)
                [
                    'course_id' => 8,
                    'title' => 'AWS EC2 Overview',
                    'content' => 'Memahami Elastic Compute Cloud service dari AWS dan instance management.'
                ],
                [
                    'course_id' => 8,
                    'title' => 'S3 & Storage Services',
                    'content' => 'Menggunakan Amazon S3 untuk object storage dan data management.'
                ],

                // Module untuk course_id 9 (UI/UX Design Principles)
                [
                    'course_id' => 9,
                    'title' => 'Design Principles',
                    'content' => 'Prinsip-prinsip dasar UI/UX design: contrast, alignment, repetition, proximity.'
                ],
                [
                    'course_id' => 9,
                    'title' => 'Wireframing & Prototyping',
                    'content' => 'Teknik wireframing dan prototyping untuk user interface design.'
                ],

                // Module untuk course_id 10 (Advanced JavaScript)
                [
                    'course_id' => 10,
                    'title' => 'ES6+ Features',
                    'content' => 'Modern JavaScript features: arrow functions, destructuring, template literals, modules.'
                ],
                [
                    'course_id' => 10,
                    'title' => 'Async Programming',
                    'content' => 'Async/await, promises, dan asynchronous programming patterns.'
                ]
            ];

            foreach ($modules as $module) {
                Module::create($module);
            }

            $this->command->info(count($modules) . ' modules successfully seeded for courses starting from ID 2!');

        } else {
            $this->command->error('No courses found with ID >= 2! Please run CourseSeeder first.');
        }
    }
}