<?php

namespace App\Http\Controllers;

use App\Http\Resources\PickupScheduleResource;
use Illuminate\Http\Request;
use App\Models\PickupSchedule;
use App\Http\Requests\PickupScheduleStoreRequest;
use App\Http\Requests\PickupScheduleUpdateRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\PickupScheduledNotification;


class PickupScheduleController extends Controller
{
    public function index()
    {
        return PickupScheduleResource::collection(
            PickupSchedule::orderBy('created_at', 'desc')
            ->paginate(7)
        );
    }

    public function store(PickupScheduleStoreRequest $request)
    {
        $validatedData = $request->validated();
        $pickupSchedule = PickupSchedule::create($validatedData);

        // Send email notification to admin
    Mail::to('njugunamuchaie@gmail.com')->send(new PickupScheduledNotification($pickupSchedule));

        return response (new PickupScheduleResource($pickupSchedule), 201);
    }

    public function show(PickupSchedule $pickupSchedule)
    {
        return new PickupScheduleResource($pickupSchedule);
    }

    public function update(PickupScheduleUpdateRequest $request, PickupSchedule $pickupSchedule)
    {
        $validatedData = $request->validated();
        $pickupSchedule->update($validatedData);

        return response (new PickupScheduleResource($pickupSchedule), 200);
    }
}

