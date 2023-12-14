import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import Table from "@/MyComponents/Datatables/Table";
import TableCell from "@/MyComponents/Datatables/TableCell";
import TableRow from "@/MyComponents/Datatables/TableRow";
import { Head } from "@inertiajs/react";
import React from "react";

function LogActivityIndex({ auth, activities, filters, settings }) {
    // console.log(activities);

    const headerTable = [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "log_name",
            label: "Log Name",
        },
        {
            key: "description",
            label: "Deskripsi",
        },
        {
            key: "subject_type",
            label: "Subject Type",
        },
        {
            key: "subject_id",
            label: "Subject ID",
        },
        {
            key: "causer_id",
            label: "Causer ID",
        },
    ];
    return (
        <>
            <AuthLayout auth={auth}>
                <Head title={`Logs - ${settings.sitename}`} />
                <div className="py-4 px-6 bg-white rounded-md border border-gray-200">
                    <Table
                        header={headerTable}
                        collections={activities}
                        filters={filters}
                    >
                        {activities.data?.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell dataLabel="ID" showLabel={true}>
                                    <span className="text-sm text-gray-500">
                                        {activity.id}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Log Name"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-500">
                                        {activity.log_name}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Deskripsi"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-500">
                                        {activity.description}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Subject Type"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-500">
                                        {activity.subject_type}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Subject ID"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-500">
                                        {activity.subject_id}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Causer ID"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-500">
                                        {activity.causer_id}
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

export default LogActivityIndex;
