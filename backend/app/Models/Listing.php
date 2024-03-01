<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'quantity',
        'expiry_date',
        'user_id',
        'location',
        'status',
        'claimed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
