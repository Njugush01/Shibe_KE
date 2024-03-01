<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
     public function toArray(Request $request): array
    {
        return [
            'id' => $this -> id,
            'name' => $this -> name,
            'email' => $this -> email,
            'phone' => $this -> phone,
            'account_type' => $this -> account_type,
            'created_at' => $this -> created_at->format('Y-m-d H:i:s'),
            'id_number' => $this -> id_number,
            'address' => $this -> address,
            'privacy_policy' => $this -> privacy_policy,
        ];
    }
}
