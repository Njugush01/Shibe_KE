<?php

namespace App\Http\Controllers;

use App\Http\Resources\PickupScheduleResource;
use Illuminate\Http\Request;
use App\Models\PickupSchedule;
use App\Http\Requests\PickupScheduleStoreRequest;
use App\Http\Requests\PickupScheduleUpdateRequest;


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

