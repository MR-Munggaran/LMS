<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'content'       => $this->content,
            'course_id'     => $this->course_id,
            'document_url'  => $this->document_url,     // dari accessor
            'video_url'     => $this->video_url,        // url asli
            'video_embed'   => $this->video_embed_url,  // dari accessor (misalnya YouTube embed)
            'assignments'   => AssignmentResource::collection($this->whenLoaded('assignments')),
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
