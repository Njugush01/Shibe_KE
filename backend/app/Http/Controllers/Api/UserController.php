<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Mail\VolunteerRegistration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')
            ->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = user::create($data);

        // if ($data['account_type'] === '3') {
        //     $password = $this->generatePassword();
    
        //     $user->update(['password' => bcrypt($password)]);
              
        // }


        return response( new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
       $data = $request->validated();
       if (isset($data['password'])) {
        $data['password'] =bcrypt($data['password']);
       }
       $user->update($data);

       return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }

    //create a function to send email to a volunteer, containing the generated password once they register
    // public function sendEmail(SignupRequest $request)
    // {
    //     $data = $request->validated();
    //     $data['password'] = bcrypt($data['password']);
    //     $user = user::create($data);

    //     if ($data['account_type'] === '3') {
    //         $password = $this->generatePassword();
    
    //         $user->update(['password' => bcrypt($password)]);

    //         // Send email notification
    //         Mail::to($user->email)->send(new VolunteerRegistration($user->name, $password));
    //     }
    //     return response( new UserResource($user), 201);
    // }

    // public function sendEmail(Request $request)
    // {
    //     $data = $request->validate([
    //         'userName' => 'required|string',
    //         'email' => 'required|email',
    //         'password' => 'required|string',
    //     ]);

    //     $name = $data['userName'];
    //     $email = $data['email'];
    //     $password = $data['password'];

    //     try {
    //         // Send email notification
    //         Mail::to($email)->send(new VolunteerRegistration($name, $password));

    //         return response()->json(['message' => 'Email sent successfully'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Failed to send email'], 500);
    //     }
    // }

    
}
