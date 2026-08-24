<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;
use App\Models\Module;
use Carbon\Carbon;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = Module::all();

        if ($modules->isEmpty()) {
            $this->command->warn("Tidak ada module, seeder Assignment dilewati.");
            return;
        }

        // 2 tugas deterministik per module (idempotent via firstOrCreate)
        foreach ($modules as $module) {
            for ($i = 1; $i <= 2; $i++) {
                Assignment::firstOrCreate(
                    [
                        'module_id' => $module->id,
                        'title' => "Tugas $i - {$module->title}",
                    ],
                    [
                        'description' => "Kerjakan tugas $i untuk module '{$module->title}'. Kumpulkan sebelum tenggat waktu yang ditentukan.",
                        'due_date' => Carbon::now()->addDays($i * 7),
                    ]
                );
            }
        }
    }
}
