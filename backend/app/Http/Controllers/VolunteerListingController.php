<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ListingResource;
use App\Models\Listing;

class VolunteerListingController extends Controller
{
    public function index(Request $request)
    {
        return ListingResource::collection(
            Listing::where('status', 1) // Filter only listings where status is 1 (accepted)
            ->orderBy('created_at', 'desc')
            ->paginate(6)
        );
    }
}
