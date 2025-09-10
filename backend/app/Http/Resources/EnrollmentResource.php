<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EnrollmentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'       => $this->id,
            'progress' => $this->progress,
            'user'     => new UserResource($this->whenLoaded('user')),
            'course'   => new CourseResource($this->whenLoaded('course')),
        ];
    }
}
