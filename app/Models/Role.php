<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Role extends \Spatie\Permission\Models\Role
{
    use HasFactory, LogsActivity;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnlyDirty()->useLogName('System');;
    }
}
