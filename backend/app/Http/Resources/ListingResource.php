<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
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
            'title' => $this -> title,
            'description' => $this -> description,
            'quantity' => $this ->quantity,
            'user_id' => $this -> user_id,
            'email' => $this -> email,
            'expiry_date' => $this -> expiry_date,
            'location' => $this -> location,
            'status' => $this->status,
            'claimed' => $this -> claimed,
            'created_at' => $this -> created_at->format('d-m-y H:i:s'),
        ];
    }
}
