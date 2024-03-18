<?php

namespace App\Http\Controllers;

use App\Http\Resources\PickupScheduleResource;
use Illuminate\Http\Request;
use App\Models\PickupSchedule;

class VolunteerPickupScheduleController extends Controller
{
    public function index(Request $request)
    {
        return PickupScheduleResource::collection(
            PickupSchedule::orderBy('created_at', 'desc')
            ->paginate(6)
        );
    }

}
