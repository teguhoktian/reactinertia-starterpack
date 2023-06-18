<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = \App\Models\Role::select(['id', 'name', 'guard_name'])->orderBy('name', 'ASC')->get();
        return Inertia::render('Role/RoleIndex',  ['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = \App\Models\Permission::select(['id', 'name', 'guard_name'])->orderBy('id', 'ASC')->get();
        return Inertia::render('Role/AddRole', ['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required|unique:roles']);
        $role = Role::create($request->only('name'));
        $role->syncPermissions($request->only('permissions'));
        return redirect()->route('master.role.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = \App\Models\Permission::select(['id', 'name', 'guard_name'])->orderBy('id', 'ASC')->get();
        return Inertia::render('Role/EditRole', [
            'role' => $role,
            'permission_roles' => $role->permissions()->pluck('name'),
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        ($role->name == "Admin") ? $role->syncPermissions(Permission::all()) : $role->syncPermissions($request->only('permissions'));
        return redirect()->route('master.role.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('master.role.index');
    }
}
