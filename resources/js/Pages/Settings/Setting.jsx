import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import React from "react";

function Setting({ auth }) {
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Setting
                    </h2>
                }
            >
                <Head title="Setting" />
                <div className="space-y-6">Halaman Setting</div>
            </AuthLayout>
        </>
    );
}

export default Setting;
