<?php

namespace App\Http\Middleware;

use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'settings' => [
                'sitename' => app(GeneralSettings::class)->site_name
            ],
            'auth' => [
                'user' => $user ? $user->only(['id', 'name', 'email', 'firstname', 'lastname']) : null,
                'roles' => $user ? $user->roles->pluck('name') : [],
                'permissions' => $user ? $user->getPermissionsViaRoles()->pluck('name') : [],
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
