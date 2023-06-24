<?php

namespace App\Services;

use App\Http\Resources\User as ResourcesUser;
use App\Models\User;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    public function getAllData()
    {
        $users = User::select(['id', 'firstname', 'lastname', 'email', 'username']);
        if (request()->search) $users = $users->where('firstname', 'LIKE', '%' . request()->search . '%')->orWhere('lastname', 'LIKE', '%' . request()->search . '%');
        if (request()->has(['field', 'direction'])) {
            $users->orderBy(request('field'), request('direction'));
        }
        $users = $users->paginate(request()->perpage ?: 10);

        return new ResourcesUser($users);
    }

    public function store($request)
    {
        $user = User::create($request->only('username', 'firstname', 'lastname', 'email', 'password'));
        $user->assignRole($request->role);
        return $user;
    }

    public function update($request, $user)
    {
        $user->syncRoles($request->role);
        return $user->update($request->only('username', 'firstname', 'lastname', 'email', 'password'));
    }

    public function delete($user)
    {
        return $user->delete();
    }
}
