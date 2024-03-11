<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

class AdminListingController extends Controller
{
    Public function index(Request $request)
    {
        return ListingResource::collection(
            Listing::orderBy('created_at', 'desc')
            ->paginate()
        );
    }
}
