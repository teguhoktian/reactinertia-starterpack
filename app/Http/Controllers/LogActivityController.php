<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class LogActivityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $activities = $this->getAllData();
        $filters = request()->all(['search', 'perpage', 'field', 'direction']);
        return Inertia::render('LogActivity/LogActivityIndex', ['activities' => $activities, 'filters' => $filters]);
    }

    public function getAllData()
    {
        $activities = Activity::query();
        if (request()->search) $activities = $activities->where('description', 'LIKE', '%' . request()->search . '%')->orWhere('properties', 'LIKE', '%' . request()->search . '%');
        if (request()->has(['field', 'direction'])) {
            $activities->orderBy(request('field'), request('direction'));
        } else {
            $activities->orderBy('id', 'DESC');
        }
        $activities = $activities->paginate(request()->perpage ?: 10);

        return new LogActivity($activities);
    }
}
