<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\VolunteerRegistration;
use Illuminate\Support\Facades\Log;

//use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    function generatePassword($length = 8) {
        // Define characters that can be used in the password
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_';

        // Generate random password
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $password .= $chars[rand(0, strlen($chars) - 1)];
        }

        return $password;
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
         Log::info(json_encode($data));

        
        // Log::info(json_encode($data));

        // die (json_encode($data));
        /** @var \App\Models\User $user */
        $userData = [
            'name' => $data['name'],
            'account_type' => $data['account_type'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            // 'password' => bcrypt($password),
        ];

        if ($data['account_type'] == 3) {
            $password = $this->generatePassword(8);
            $userData['password'] = bcrypt($password);
            $userData['id_number'] = $data['id_number'];
            $userData['address'] = $data['address'];
            $userData['privacy_policy'] = $data['privacy_policy'];

            $user = User::create($userData);

            Mail::to($user->email)->send(new VolunteerRegistration($user->name, $password));

        } else {
            // For non-volunteer users, let them input their own password
            $userData['password'] = bcrypt($data['password']);
            $user = User::create($userData);
        }

        // Create the user
        //$user = User::create($userData);


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
