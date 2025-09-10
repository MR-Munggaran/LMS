<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'created_by'  => new UserResource($this->whenLoaded('creator')),
            'modules'     => ModuleResource::collection($this->whenLoaded('modules')),
            'exams'       => ExamResource::collection($this->whenLoaded('exams')),
        ];
    }
}
