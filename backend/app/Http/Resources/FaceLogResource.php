<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FaceLogResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'        => $this->id,
            'verified'  => $this->verified,
            'user'      => new UserResource($this->whenLoaded('user')),
            'exam_id'   => $this->exam_id,
            'created_at'=> $this->created_at,
        ];
    }
}
