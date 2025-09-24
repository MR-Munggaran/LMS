<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->longText('content')->nullable();
            
            // Tambahan
            $table->string('document_path')->nullable(); // path dokumen
            $table->string('video_url')->nullable();     // link video
            
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
