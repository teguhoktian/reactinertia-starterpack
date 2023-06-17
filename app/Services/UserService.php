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
        $users = User::select(['id', 'firstname', 'lastname', 'email', 'username'])->with([
            'roles' => function ($query) {
                $query->select('name')->pluck('name');
            }
        ]);
        if (request()->search) $users = $users->where('firstname', 'LIKE', '%' . request()->search . '%')->orWhere('lastname', 'LIKE', '%' . request()->search . '%');
        if (request()->has(['field', 'direction'])) {
            $users->orderBy(request('field'), request('direction'));
        }
        $users = $users->paginate(request()->perpage ?: 10);

        return new ResourcesUser($users);
    }

    public function update($user)
    {
        $user->syncRoles(request()->role);
        return $user->update(request()->all());
    }

    public function delete($user)
    {
        return $user->delete();
    }

    public function allRole(string $guard = "web")
    {
        return Role::where('guard_name', $guard)->orderBy('name', 'ASC')->get();
    }
}
