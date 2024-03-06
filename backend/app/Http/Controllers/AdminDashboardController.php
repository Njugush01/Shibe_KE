<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Listing;
use App\Http\Resources\ListingResourceAdminDashboard;

use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        // Total number of donors (users with 'donor' account type)
        $totalDonors = User::query()->where('account_type', 2)->count();

        // Total number of volunteers (users with 'volunteer' account type)
        $totalVolunteers = User::query()->where('account_type', 3)->count();

        // Total number of listings
        $totalListings = Listing::query()->count();

        //Total claimed listings
        $totalClaimedListings = Listing::query()->where('claimed', 1)->count();
        
        // Latest listing
        $latestListing = Listing::query()->latest('created_at')->first();

        return[
            'totalDonors' => $totalDonors,
            'totalVolunteers' => $totalVolunteers,
            'totalListings' => $totalListings,
            'totalClaimedListings' => $totalClaimedListings,
            'latestListing' => $latestListing ? new ListingResourceAdminDashboard($latestListing) : null,
        ];  
    }
}
