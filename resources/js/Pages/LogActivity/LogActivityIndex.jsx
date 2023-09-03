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
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Logs
                    </h2>
                }
            >
                <Head title={`Logs - ${settings.sitename}`} />
                <Card className="mt-4">
                    <Table
                        header={headerTable}
                        collections={activities}
                        filters={filters}
                    >
                        {activities.data?.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell dataLabel="ID" showLabel={true}>
                                    <span className="text-sm text-gray-900">
                                        {activity.id}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Log Name"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-900">
                                        {activity.log_name}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Deskripsi"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-900">
                                        {activity.description}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Subject Type"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-900">
                                        {activity.subject_type}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Subject ID"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-900">
                                        {activity.subject_id}
                                    </span>
                                </TableCell>
                                <TableCell
                                    dataLabel="Causer ID"
                                    showLabel={true}
                                >
                                    <span className="text-sm text-gray-900">
                                        {activity.causer_id}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Card>
            </AuthLayout>
        </>
    );
}

export default LogActivityIndex;
