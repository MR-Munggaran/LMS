<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'question_text' => $this->question_text,
            'question_type' => $this->question_type,
            'points'        => $this->points,
            'options'       => ExamQuestionOptionResource::collection(
                $this->whenLoaded('options')
            ),
        ];
    }
}
