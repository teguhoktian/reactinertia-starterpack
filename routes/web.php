<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\LogActivityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Middleware\NonInertiaRoutes;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::prefix("master")->name('master.')->group(function () {
        Route::resource('user', UserController::class);

        Route::get('roles-permissions', [RoleController::class, 'index'])->name('role.index');
        Route::get('roles-permissions/add', [RoleController::class, 'create'])->name('role.create');
        Route::post('roles-permissions', [RoleController::class, 'store'])->name('role.store');
        Route::get('roles-permissions/{role}/edit', [RoleController::class, 'edit'])->name('role.edit');
        Route::delete('roles-permissions/{role}', [RoleController::class, 'destroy'])->name('role.destroy');
        Route::patch('roles-permissions/{role}', [RoleController::class, 'update'])->name('role.update');
    });

    Route::prefix("setting")->name('setting.')->group(function () {
        Route::get('/backup', [BackupController::class, 'index'])->name('backup.index');
        Route::delete('/backup', [BackupController::class, 'deleteFile'])->name('backup.delete');
        Route::post('/backup', [BackupController::class, 'createBackup'])->name('backup.create');
        Route::get('/backup/download', [BackupController::class, 'downloadBackup'])->middleware(NonInertiaRoutes::class)->name('backup.download');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/log-activity', LogActivityController::class)->name('log.activity');

    Route::get('/setting', function () {
        return Inertia::render('Settings/Setting');
    })->middleware(['auth', 'verified'])->name('setting');
});

require __DIR__ . '/auth.php';
