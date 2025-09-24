<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            // tambahkan kolom untuk jenis soal
            $table->enum('question_type', ['multiple_choice', 'essay', 'mixed'])
                  ->default('multiple_choice')
                  ->after('type');
        });
    }

    public function down(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->dropColumn('question_type');
        });
    }
};
