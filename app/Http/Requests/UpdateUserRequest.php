<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required'],
            'lastname' => ['required'],
            'role' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,' . $this->route()->user->id],
            'username' => ['required', 'min:6', 'unique:users,username,' . $this->route()->user->id, 'alpha_dash']
        ];
    }
}
