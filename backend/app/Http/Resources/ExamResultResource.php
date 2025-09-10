<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamResultResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'score'       => $this->score,
            'submitted_at'=> $this->submitted_at,
            'user'        => new UserResource($this->whenLoaded('user')),
            'exam_id'     => $this->exam_id,
        ];
    }
}
