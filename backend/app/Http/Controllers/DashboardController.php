<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListingResourceDashboard;
use App\Models\Listing;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

         $user = $request->user();

            //Total number of listings
            $total = Listing::query()->where('user_id', $user->id)->count();

            //Latest listing
            $latest = Listing::query()->where('user_id', $user->id)->latest
            ('created_at')->first();
        return [
            'totalListings' => $total,
            'latestListing' => $latest ? new ListingResourceDashboard($latest) : null,
        ];
    }
}
