import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Card from "@/MyComponents/Card/Card";
import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton.jsx";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";

function RoleIndex({ auth, roles }) {
    const handleDelete = (id) => {
        if (confirm("Anda Yakin?"))
            router.delete(route("master.role.destroy", id));
    };
    return (
        <>
            <AuthLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Roles & Permission
                    </h2>
                }
            >
                <Head title="Roles & Permissions" />
                <Card>
                    <div className="mb-4 justify-end flex items-center flex-row space-x-1">
                        <Link href="">
                            <SecondaryButton className="text-sm flex flex-row space-x-1">
                                <Refresh sx={{ fontSize: "20px" }} />
                            </SecondaryButton>
                        </Link>
                        <Link href="/master/roles-permissions/add">
                            <PrimaryButton className="text-sm flex flex-row space-x-1">
                                <Add sx={{ fontSize: "20px" }} />
                                <span>Add Role</span>
                            </PrimaryButton>
                        </Link>
                    </div>
                    {/* Table Disini */}
                    <table className="block md:table w-full text-sm text-left">
                        <thead className="hidden bg-slate-100 md:table-header-group text-gray-600 border boder-gray-400">
                            <tr>
                                <th className="py-3 px-4 block md:table-cell font-semibold text-xs uppercase">
                                    Role
                                </th>
                                <th className="py-3 px-4 block md:table-cell font-semibold text-xs uppercase">
                                    Guard
                                </th>
                                <th className="py-3 px-4 block md:table-cell font-semibold text-xs uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                            {roles?.map((role, index) => (
                                <tr key={index}>
                                    <td className="border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2">
                                        {role.name}
                                    </td>
                                    <td className="border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2">
                                        {role.guard_name}
                                    </td>
                                    <td className="border-b md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-3 py-2">
                                        <div className="flex flex-row space-x-2">
                                            <Link
                                                href={`/master/roles-permissions/${role.id}/edit`}
                                                className="text-blue-600 font-medium"
                                            >
                                                <Edit fontSize="inherit" />
                                            </Link>
                                            <Link
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDelete(role.id);
                                                }}
                                                className="text-red-600 font-medium"
                                            >
                                                <Delete fontSize="inherit" />
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
