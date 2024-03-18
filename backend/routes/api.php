<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminListingController;
use App\Http\Controllers\VolunteerListingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\VolunteerPickupScheduleController;
use App\Http\Controllers\PickupScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/auth/users', UserController::class);
    Route::apiResource('/auth/listing', ListingController::class);
    Route::apiResource('/auth/listed', AdminListingController::class);
    Route::apiResource('/auth/v-listed', VolunteerListingController::class);
    Route::apiResource('/auth/pickup-schedules', PickupScheduleController::class);
    
    Route::put('/auth/user/{user}', [UserController::class, 'update']);
    Route::get('/auth/listing/{listing}', [ListingController::class, 'show']);
    Route::put('/auth/listing/{listing}', [ListingController::class, 'update']);
    Route::put('/auth/listing/{listing}/status', [ListingController::class, 'updateStatus']);
    Route::put('/auth/listing/{listing}/claim', [ListingController::class, 'claim']);
    Route::put('/auth/listing/{listing}/pickup', [ListingController::class, 'pickUp']);
    Route::get('/auth/listings/my-claims', [ListingController::class, 'myClaims']);
    Route::get('/auth/pending', [ListingController::class, 'pendingListings']);
    Route::get('/auth/accepted', [ListingController::class, 'acceptedListings']);
    Route::get('/auth/rejected', [ListingController::class,'rejectedListings']);

    Route::get('/auth/scheduled-pickups', [PickupScheduleController::class, 'index']);


    Route::get('/auth/dashboard', [DashboardController::class, 'index']);
    Route::get('/auth/admin-dashboard', [AdminDashboardController::class, 'index']);

    

});
Route::apiResource('/auth/scheduled-pickups', VolunteerPickupScheduleController::class);

Route::post('/guest/signup', [AuthController::class, 'signup']);
Route::post('/guest/signin', [AuthController::class, 'signin']);
Route::post('/send-email', [UserController::class, 'sendEmail']);
