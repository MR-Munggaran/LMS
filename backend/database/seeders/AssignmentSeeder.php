<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;
use App\Models\Module;
use Faker\Factory as Faker;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $modules = Module::all();

        if ($modules->isEmpty()) {
            $this->command->warn("⚠️ Tidak ada module, seeder Assignment dilewati.");
            return;
        }

        // buat 10 assignment acak
        for ($i = 0; $i < 10; $i++) {
            $module = $modules->random();

            Assignment::create([
                'module_id'   => $module->id,
                'title'       => 'Tugas ' . ($i + 1) . ' - ' . $faker->sentence(3),
                'description' => $faker->paragraph(),
                'due_date'    => $faker->dateTimeBetween('now', '+1 month'),
            ]);
        }
    }
}
