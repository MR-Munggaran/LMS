<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionOptionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'option_text' => $this->option_text,
            'is_correct'  => $this->when(
                auth()->check() && auth()->user()->role === 'teacher',
                $this->is_correct
            ),
        ];
    }
}
