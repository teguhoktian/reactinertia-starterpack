import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import { Head } from "@inertiajs/react";
import React from "react";

function Setting({ auth }) {
    return (
        <>
            <AuthLayout
                user={auth.user}
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
