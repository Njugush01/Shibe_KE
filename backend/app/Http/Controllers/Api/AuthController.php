<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
    
        // Initialize an array with the common user data
        $userData = [
            'name' => $data['name'],
            'account_type' => $data['account_type'],
            'phone' => $data['phone'],
            'email' => $data['email'],
        ];
    
        // Check the account type
        if ($data['account_type'] === '2') { // Donor
            // Include password for donor
            $userData['password'] = bcrypt($data['password']);
        } elseif ($data['account_type'] === '3') { // Volunteer
            // Include id_number, address, and privacy_policy for volunteer
            $userData['id_number'] = $data['id_number'];
            $userData['address'] = $data['address'];
            $userData['privacy_policy'] = $data['privacy_policy'];
        }
    
        // Create user with the modified data
        $user = User::create($userData);
    
        // Generate token
        $token = $user->createToken('main')->plainTextToken;
    
        return response(compact('user', 'token'));
    }

    public function signin(SigninRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect',
            ], 422);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);

    }

}
