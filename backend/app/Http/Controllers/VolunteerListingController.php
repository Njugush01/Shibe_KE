<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ListingResource;
use App\Models\Listing;

class VolunteerListingController extends Controller
{
    Public function index(Request $request)
    {
        return ListingResource::collection(
            Listing::orderBy('created_at', 'desc')
            ->paginate(6)
        );
    }
}
