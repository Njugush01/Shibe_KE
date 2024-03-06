<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'account_type' => 'required|integer|max:3',
            'phone' => 'required|string|max:12',
        ];

       
        if ($this->input('account_type') == 2) {
            $rules['password'] = [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ];
        } else if ($this->input('account_type') == 3) {
            $rules['id_number'] ='required|string|max:8';
            $rules['address'] ='required|string|max:255';
            $rules['privacy_policy'] ='required|boolean';
        }

         return $rules;
    }
}
