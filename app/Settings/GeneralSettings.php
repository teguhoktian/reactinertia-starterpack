<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public string $asset_url;
    public string $locale;
    public string $timezone;

    public static function group(): string
    {
        return 'general';
    }
}
