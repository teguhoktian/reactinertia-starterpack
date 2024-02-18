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
        $users = User::with(['roles'])->select(['id', 'name', 'email', 'username', 'profile_image']);
        if (request()->search) $users = $users->where('name', 'LIKE', '%' . request()->search . '%');
        if (request()->has(['field', 'direction'])) {
            $users->orderBy(request('field'), request('direction'));
        }
        $users = $users->paginate(request()->perpage ?: 10)->OnEachSide(1);

        return new ResourcesUser($users);
    }

    public function store($request)
    {
        $user = User::create($request->only('username', 'name', 'email', 'password'));
        $user->assignRole($request->role);
        return $user;
    }

    public function update($request, $user)
    {
        $user->syncRoles($request->role);
        return $user->update($request->only('username', 'name', 'email', 'password'));
    }

    public function delete($user)
    {
        return $user->delete();
    }
}
