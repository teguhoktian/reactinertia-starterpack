<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(GeneralSettings $settings)
    {
        return Inertia::render('Settings/General/GeneralIndex', ['settings' => $settings]);
    }

    public function store(GeneralSettings $settings, Request $request)
    {
        $settings->site_name = $request->site_name;
        $settings->asset_url = $request->asset_url;
        $settings->locale = $request->locale;
        $settings->timezone = $request->timezone;

        $settings->save();

        return redirect()->back();
    }
}
