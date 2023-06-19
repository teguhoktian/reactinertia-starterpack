import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import React from "react";

function Index({ auth }) {
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <div>Dashboard</div>
            </AuthLayout>
        </>
    );
}

export default Index;
