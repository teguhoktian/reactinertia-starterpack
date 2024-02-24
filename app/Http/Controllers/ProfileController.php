<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Traits\UploadFile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    use UploadFile;
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // return Inertia::render('Profile/Edit', [
        return Inertia::render('Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update Profile Information
     *
     * @param ProfileUpdateRequest $request
     * @return RedirectResponse
     */

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // return $request->hasFile('profile_image');
        if ($request->hasFile('image') || !is_null($request->file('image'))) {

            if (!is_null($request->user()->profile_image)) $this->deleteFile($request->user()->profile_image);

            $request->user()->profile_image = $this->uploadFile($request->file('image'), 'Profile');
        }

        if ($request->remove_image == "true") $request->user()->profile_image = null;

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('message', $request->file('profile_image'));
    }

    /**
     * Delete Profile
     *
     * @param Request $request
     * @return RedirectResponse
     */

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
