<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'type'       => $this->type,
            'start_time' => $this->start_time,
            'end_time'   => $this->end_time,
            'course_id'  => $this->course_id,
            'results'    => ExamResultResource::collection($this->whenLoaded('results')),
            'face_logs'  => FaceLogResource::collection($this->whenLoaded('faceLogs')),
        ];
    }
}
