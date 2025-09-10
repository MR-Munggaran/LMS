<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'email'          => $this->email,
            'role'           => new RoleResource($this->whenLoaded('role')),
            'face_data_path' => $this->face_data_path,
            'created_at'     => $this->created_at,
        ];
    }
}
