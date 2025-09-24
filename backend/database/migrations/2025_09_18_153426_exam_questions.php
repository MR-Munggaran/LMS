<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->text('question_text'); // isi soal
            $table->enum('question_type', ['multiple_choice', 'essay']); // tipe soal
            $table->integer('points')->default(1); // bobot nilai
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_questions');
    }
};
