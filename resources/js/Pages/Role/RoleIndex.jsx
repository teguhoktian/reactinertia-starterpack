import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Card from "@/MyComponents/Card/Card";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";

function RoleIndex({ auth, roles, settings }) {
    const handleDelete = (id) => {
        if (confirm("Anda Yakin?"))
            router.delete(route("master.role.destroy", id));
    };
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Roles & Permission
                    </h2>
                }
            >
                <Head title={`Role & Permission - ${settings.sitename}`} />
                <Card>
                    <div className="mb-4 justify-end flex items-center flex-row space-x-1">
                        <Link href="">
                            <SecondaryButton className="flex flex-row space-x-1">
                                <ArrowPathIcon className="w-6 h-6" />
                            </SecondaryButton>
                        </Link>
                        <Link href="/master/roles-permissions/add">
                            <PrimaryButton className="pl-2 gap-1">
                                <PlusIcon className="h-6 w-6" />
                                <span>Add Role</span>
                            </PrimaryButton>
                        </Link>
                    </div>
                    {/* Table Disini */}
                    <table className="table w-full text-left text-medium">
                        <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                            <tr>
                                <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                    Role
                                </th>
                                <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                    Guard
                                </th>
                                <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-row-group text-sm">
                            {roles?.map((role, index) => (
                                <tr key={index}>
                                    <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                        {role.name}
                                    </td>
                                    <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                        {role.guard_name}
                                    </td>
                                    <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                        <div className="flex flex-row space-x-2">
                                            <Link
                                                href={`/master/roles-permissions/${role.id}/edit`}
                                                className="text-blue-600 font-medium"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDelete(role.id);
                                                }}
                                                className="text-red-600 font-medium"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </AuthLayout>
        </>
    );
}

export default RoleIndex;
