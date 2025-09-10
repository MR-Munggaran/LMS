<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'assignment_id' => $this->assignment_id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],
            'file_url' => $this->file_path ? asset('storage/' . $this->file_path) : null,
            'answer_text' => $this->answer_text,
            'score' => $this->score,
            'created_at' => $this->created_at,
        ];
    }
}
