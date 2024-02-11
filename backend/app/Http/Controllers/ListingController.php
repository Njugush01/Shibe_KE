<?php

namespace App\Http\Controllers;
use App\Http\Requests\ListingStoreRequest;
use App\Http\Requests\ListingUpdateRequest;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

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
}
