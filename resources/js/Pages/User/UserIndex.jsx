import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import Table from "@/MyComponents/Datatables/Table";
import TableCell from "@/MyComponents/Datatables/TableCell";
import headerTable from "./headerTable.js";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton.jsx";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton.jsx";
import TableRow from "@/MyComponents/Datatables/TableRow.jsx";
import { useEffect } from "react";
import {
    ArrowPathIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import AlertSuccess from "@/MyComponents/Alert/AlertSuccess.jsx";
import AvatarLetter from "@/MyComponents/Navbar/AvatarLetter.jsx";

function UserIndex({ auth, users, filters, flash, settings }) {
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(route("master.user.destroy", id), {
                onStart: (visit) => {
                    setLoading(true);
                    setShowMessage(false);
                },
                onSuccess: (page) => {
                    setShowMessage(true);
                    setLoading(false);
                },
            });
        }
    };

    useEffect(() => {
        setShowMessage(flash.message !== null ? true : false);
    }, [flash]);

    return (
        <>
            <AuthLayout auth={auth}>
                {/* Head */}
                <Head title={`Pengguna - ${settings.sitename}`} />

                {/* Message Flash */}
                {showMessage && (
                    <AlertSuccess delay="5000" show={showMessage}>
                        {flash.message}
                    </AlertSuccess>
                )}

                {/* Content */}
                <div className="py-4 px-6 bg-white rounded-md border-gray-200 border">
                    <div className="mb-4 justify-start flex items-center flex-row space-x-1">
                        <PrimaryButton
                            className="lg:pl-2 gap-1"
                            onClick={(e) => {
                                router.visit(route("master.user.index"));
                            }}
                        >
                            <ArrowPathIcon className="w-4 h-4" />
                            <span className="hidden md:block">Reload</span>
                        </PrimaryButton>
                        <SecondaryButton
                            className="lg:pl-2 gap-1"
                            onClick={(e) => {
                                router.visit(route("master.user.create"));
                            }}
                        >
                            <PlusIcon className="h-4 w-4" />{" "}
                            <span className="hidden md:block">Add</span>
                        </SecondaryButton>
                    </div>
                    <Table
                        header={headerTable}
                        collections={users}
                        filters={filters}
                    >
                        {users.data?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.profile_image ? (
                                        <img
                                            src={`/storage/${user.profile_image}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <AvatarLetter name={user.name} />
                                    )}
                                    <span className="ml-4 text-sm text-gray-900">
                                        {user.name}
                                    </span>
                                </TableCell>
                                <TableCell dataLabel="Email" showLabel={true}>
                                    <span className="text-sm text-gray-600">
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Username"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-600">
                                        {user.username}
                                    </span>
                                </TableCell>
                                <TableCell dataLabel="Role" showLabel={true}>
                                    <span className="text-gray-600">
                                        {user.roles?.map((role, index) => (
                                            <span
                                                className="rounded-md py-1 px-2 text-xs font-medium bg-emerald-200 text-green-900"
                                                key={index}
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </span>
                                </TableCell>
                                <TableCell showLabel={true}>
                                    <span className="text-sm text-gray-600">
                                        <Link
                                            href={route(
                                                "master.user.edit",
                                                user.id
                                            )}
                                            className={`text-sky-700 inline-flex py-2 px-2 rounded text-xs`}
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(user.id);
                                            }}
                                            className={`text-red-700 inline-flex py-2 px-2 rounded text-xs`}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </Link>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            </AuthLayout>
        </>
    );
}

export default UserIndex;
