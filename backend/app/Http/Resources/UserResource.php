<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'email'           => $this->email,
            'role'            => new RoleResource($this->role),
            // 'face_data_path'  => $this->face_data_path, // sementara tidak ditampilkan
            'jenjang_sekolah' => $this->jenjang_sekolah,
            'asal_sekolah'    => $this->asal_sekolah,
            'avatar_url'      => $this->avatar_url, // dari accessor
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
