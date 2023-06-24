<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $services = "";

    public function __construct(UserService $services)
    {
        $this->services = $services;
        $this->middleware(['role:Admin']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = $this->services->getAllData();
        $filters = request()->all(['search', 'perpage', 'field', 'direction']);
        return Inertia::render(
            'User/UserIndex',
            [
                'users' => $users,
                'filters' => $filters
            ]
        );
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::pluck('name');
        return Inertia::render('User/UserAdd', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $request['password'] = Hash::make('password');
        $this->services->store($request);
        return redirect()->back()->with(__('Data saved'));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::pluck('name');
        $user->role = $user->roles->pluck('name');
        return Inertia::render('User/UserEdit', ['roles' => $roles, 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $request['password'] = $user->password;
        $this->services->update($request, $user);
        return redirect()->back()->with(__('Data updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->services->delete($user);
        return redirect()->back()->with(__('Data deleted'));
    }
}
