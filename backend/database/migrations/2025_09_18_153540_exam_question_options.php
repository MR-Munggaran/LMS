<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_question_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('exam_questions')->onDelete('cascade');
            $table->string('option_text'); // isi jawaban pilihan
            $table->boolean('is_correct')->default(false); // true kalau jawaban benar
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_question_options');
    }
};
