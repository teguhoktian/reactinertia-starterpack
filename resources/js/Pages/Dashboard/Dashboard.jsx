import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import { Head } from "@inertiajs/react";
import React from "react";

function Index({ auth, settings }) {
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-base text-gray-700 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title={`Dashboard - ${settings.sitename}`} />
                <Card>
                    <h1 className="text-2xl mb-4">Welcome page.</h1>
                    <span className="text-sm">
                        Hi, {auth.user.firstname}! Welcome to React-Inertia.js
                        Starter Pack Application.
                    </span>
                </Card>
            </AuthLayout>
        </>
    );
}

export default Index;
