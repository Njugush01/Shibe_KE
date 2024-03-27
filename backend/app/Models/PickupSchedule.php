<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PickupSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'user_id',
        'pickup_date',
        'message',
    ];
    public function listing()
    {
        return $this->belongsTo(Listing::class, 'listing_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
