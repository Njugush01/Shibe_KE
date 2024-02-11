<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\AdminListingController;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
});
    Route::post('/logout',[AuthController::class,'logout']);
    Route::apiResource('/auth/users', UserController::class);
    Route::apiResource('/auth/listing', ListingController::class);
    Route::apiResource('/auth/listed', AdminListingController::class);
    


    Route::get('/auth/dashboard', [DashboardController::class, 'index']);
    Route::get('/auth/admin-dashboard', [AdminDashboardController::class, 'index']);
});
   

Route::post('/guest/signup',[AuthController::class,'signup']);
Route::post('/guest/signin',[AuthController::class,'signin']);
