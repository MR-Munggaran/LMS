<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AssignmentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'description'  => $this->description,
            'module_id'    => $this->module_id,
            'document_url' => $this->document_path 
                                ? Storage::url($this->document_path) 
                                : null, // URL untuk akses dokumen
            'due_date'     => $this->due_date,      // sudah diformat di accessor
            'due_date_raw' => $this->getRawOriginal('due_date'), // nilai asli dari DB
        ];
    }
}
