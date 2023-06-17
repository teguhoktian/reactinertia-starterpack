import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import Table from "@/MyComponents/Datatables/Table";
import TableCell from "@/MyComponents/Datatables/TableCell";
import Card from "@/MyComponents/Card/Card";
import { Delete, Edit } from "@mui/icons-material";

function UserIndex({ auth, users, filters }) {
    console.log(users);
    const dataHeader = [
        {
            key: "firstname",
            label: "First Name",
            sort: true,
        },
        {
            key: "lastname",
            label: "Last Name",
            sort: true,
        },
        {
            key: "email",
            label: "E-Mail",
            sort: true,
        },
        {
            key: "username",
            label: "Username",
            sort: true,
        },
        {
            key: "role",
            label: "Roles",
        },
        {
            key: "action",
            label: "Aksi",
        },
    ];

    return (
        <>
            <AuthLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Pengguna
                    </h2>
                }
            >
                <Head title="Pengguna" />
                <Card>
                    <Table
                        header={dataHeader}
                        collections={users}
                        filters={filters}
                    >
                        {users.data?.map((user, id) => (
                            <tr
                                key={id}
                                className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                            >
                                <TableCell
                                    dataLabel="First Name"
                                    showLabel={true}
                                >
                                    <span className="font-medium text-sm text-gray-900">
                                        {user.firstname}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Last Name"
                                    showLabel={true}
                                >
                                    <span className="font-medium text-sm text-gray-900">
                                        {user.lastname}
                                    </span>
                                </TableCell>
                                <TableCell dataLabel="Email" showLabel={true}>
                                    <span className="font-medium text-sm text-gray-900">
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Username"
                                    showLabel={true}
                                >
                                    <span className="font-medium text-sm text-gray-900">
                                        {user.username}
                                    </span>
                                </TableCell>
                                <TableCell dataLabel="Role" showLabel={true}>
                                    <span className="font-medium text-sm text-gray-900">
                                        {user.roles?.map((role, index) => (
                                            <span
                                                className="rounded-full py-1 px-3 text-xs font-semibold bg-emerald-200 text-green-900"
                                                key={index}
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </span>
                                </TableCell>
                                <TableCell dataLabel="Aksi" showLabel={true}>
                                    <span className="font-medium text-sm text-gray-900">
                                        <Link
                                            href="/"
                                            className={`text-sky-700 inline-flex py-2 px-2 rounded text-xs`}
                                        >
                                            <Edit fontSize="small" />
                                        </Link>
                                        <Link
                                            href="/"
                                            className={`text-red-700 inline-flex py-2 px-2 rounded text-xs`}
                                        >
                                            <Delete fontSize="small" />
                                        </Link>
                                    </span>
                                </TableCell>
                            </tr>
                        ))}
                    </Table>
                </Card>
            </AuthLayout>
        </>
    );
}

export default UserIndex;
