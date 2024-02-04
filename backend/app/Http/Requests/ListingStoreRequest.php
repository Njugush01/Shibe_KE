<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListingStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; 
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' =>$this->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'=> 'required|string|max:1000',
            'user_id'=>'exists:users,id',
            'description'=>'required|string',
            'quantity'=>'required|integer|min:1',
            'expiry_date'=>'date|after:today',
            'location' => 'required|string|max:255',
        ];
    }
}
