<?php

namespace App\Http\Controllers;
use App\Http\Requests\ListingStoreRequest;
use App\Http\Requests\ListingUpdateRequest;
use App\Http\Resources\ListingResource;
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

        return ListingResource::collection(
            Listing::where('user_id', $user->id)
            ->orderBy('created_at','desc')
            ->paginate(7)
        );
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
        $listing = Listing::create($data);
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
     * Update the specified resource in storage.
     */
    public function update(ListingUpdateRequest $request, Listing $listing)
    {
        $data = $request->validated();
        die($data);

        //Update listing in the database
        $listing->update($data);
        
        return new ListingResource($listing);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing, Request $request)
    {
        $listing->delete();
        return response('',204);
    }

    public function updateStatus(Request $request, Listing $listing)
    {
        // $request->validate([
        //     'status' => 'required|integer|between:0,2',
        //     'user_id'=> 'required|integer|exists:users,id'
        // ]);

        
        $listing->status = $request->status;
        $listing->save();

        $user = $listing->user;
        
        
        // $user_id = $listing->user_id;
        // $user = User::where('id', $user_id)->first();
        // $email = $user->email;

        $message = "";

        if ($listing-> status == '1') {
            $message = "Hello $user->name, your donation has been accepted.";
        } elseif ($listing-> status == '2') {
            $message = "Hello $user->name, your donation has been rejected.";
        }
        

        Mail::to($user->email)->send(new NotifyStatus($message));
        // $results = DB::select('select * from users where id = :id', ['id' =>$listing->user_id]);
        // Log::debug("Update Status: ".json_encode($listing));
        // Log::debug("Update Results: ".json_encode($results));
        return new ListingResource($listing);
    }
}
