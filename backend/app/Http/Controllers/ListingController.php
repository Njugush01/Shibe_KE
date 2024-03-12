<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListingStoreRequest;
use App\Http\Requests\ListingUpdateRequest;
use App\Http\Resources\ListingResource;
use App\Mail\NotifyAdmin;
use App\Mail\NotifyClaim;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\NotifyStatus;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)

    {
        $user = $request->user();
        $month = $request->query('month');

        // If month is provided, filter listings by that month
        if ($month) {
            return ListingResource::collection(
                Listing::whereMonth('created_at', $month)->where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(7)
            );
        } else {
            return ListingResource::collection(
                Listing::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(6)
            );
        }

        // return ListingResource::collection(
        //     Listing::where('user_id', $user->id)
        //     ->orderBy('created_at','desc')
        //     ->paginate(7)
        // );
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ListingStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ListingStoreRequest $request)
    {
        $data = $request->validated();

        // return $data;
        $data['user_id'] = $request->user()->id;
        $data['status'] = 0;
        $data['claimed'] = 0;
        $listing = Listing::create($data);

        $user = $listing->user;

        //send notification email to admin
        $message = "Hello, a new donation has been made by $user->name.";
        Mail::to('njugunamuchaie@gmail.com')->send(new NotifyAdmin($message));


        return new ListingResource($listing);
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing, Request $request)
    {
        $user = $request->user();
        return new ListingResource($listing);
    }


    /**
     * Display the specified resource.
     */
    public function myClaims(Listing $listing, Request $request)
    {
        $user = $request->user();
        $data = Listing::where('claimed_by', $user->id)->orderBy('created_at', 'desc')->get();

        return $data;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ListingUpdateRequest $request, Listing $listing)
    {
        $data = $request->validated();

        //Update listing in the database
        $listing->update($data);

        return new ListingResource($listing);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        $listing->delete();
        return response('', 204);
    }

    public function updateStatus(Request $request, Listing $listing)
    {

        $listing->status = $request->status;
        $listing->save();

        $user = $listing->user;


        // $user_id = $listing->user_id;
        // $user = User::where('id', $user_id)->first();
        // $email = $user->email;

        $message = "";

        if ($listing->status == 1) {
            $message = "Hello $user->name, your donation '{$listing->title}' with ID {$listing->id} has been accepted. Our agent will contact you. Thank you for your generosity!";
        } elseif ($listing->status == 2) {
            $message = "Hello $user->name, your donation '{$listing->title}' with ID {$listing->id} has been rejected.";
        }


        Mail::to($user->email)->send(new NotifyStatus($message));
        // $results = DB::select('select * from users where id = :id', ['id' =>$listing->user_id]);
        // Log::debug("Update Status: ".json_encode($listing));
        // Log::debug("Update Results: ".json_encode($results));
        return new ListingResource($listing);
    }

    public function claim(Listing $listing)
    {
        $user = auth()->user();


        if ($listing->claimed == 1) {
            return response()->json(['message' => 'Listing already claimed'], 400);
        }
        $listing->claimed = 1;
        $listing->claimed_by = $user->id;
        $listing->save();

        // Send notification email to admin
        $message = "Hello, the listing with the title: {$listing->title} and ID: {$listing->id} has been claimed by {$user->name} with the phone number: {$user->phone}.";
        Mail::to('njugunamuchaie@gmail.com')->send(new NotifyClaim($user, $listing));

        return new ListingResource($listing);
    }

    public function pendingListings(Listing $listing, Request $request)
    {
        $data = Listing::where('status', 0)->orderBy('created_at', 'desc')->get();
        return $data;
        // return ListingResource::collection(
        //     Listing::where('status', 0)->orderBy('created_at', 'desc')->paginate(10)
        // );
    }

    public function acceptedListings(Listing $listing, Request $request)
    {
        $data = Listing::where('status', 1)->orderBy('created_at', 'desc')->get();
        return $data;
    }

    public function rejectedListings(Listing $listing, Request $request)
    {
        $data = Listing::where('status', 2)->orderBy('created_at', 'desc')->get();
        return $data;
    }
}
