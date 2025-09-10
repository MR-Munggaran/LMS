<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'content'     => $this->content,
            'course_id'   => $this->course_id,
            'assignments' => AssignmentResource::collection($this->whenLoaded('assignments')),
        ];
    }
}
