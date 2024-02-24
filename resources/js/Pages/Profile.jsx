import { Head } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import React from "react";
import DeleteUserForm from "./Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "./Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformation from "./Profile/Partials/UpdateProfileInformationForm";

function Profile({ auth, settings, mustVerifyEmail, status }) {
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-base text-gray-700 leading-tight">
                        Profile
                    </h2>
                }
            >
                <Head title={`Profile - ${settings.sitename}`} />
                <div className="space-y-4">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformation
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}

export default Profile;
