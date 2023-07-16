<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', env('APP_NAME', 'Laravel'));
        $this->migrator->add('general.asset_url', env('APP_URL', 'http://localhost'));
        $this->migrator->add('general.locale', 'en');
        $this->migrator->add('general.timezone', 'Asia/Jakarta');
    }
};
