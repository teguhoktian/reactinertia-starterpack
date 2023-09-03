import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";
import UserForm from "./UserForm";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function UserEdit({ user, auth, roles, settings }) {
    const {
        data,
        setData,
        patch,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
    });
    const submit = (e) => {
        e.preventDefault();

        patch(route("master.user.update", user.id));
    };
    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Pengguna
                    </h2>
                }
            >
                <Head title={`Edit Pengguna - ${settings.sitename}`} />
                <Card>
                    <SecondaryButton
                        className="mb-4"
                        onClick={(e) => {
                            router.visit(route("master.user.index"));
                        }}
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </SecondaryButton>
                    <form onSubmit={submit}>
                        <UserForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            roles={roles}
                        />
                        <div className="flex items-center gap-4 mt-4">
                            <PrimaryButton disabled={processing}>
                                {processing ? "Please Wait..." : "Save"}
                            </PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">
                                    Updated.
                                </p>
                            </Transition>
                        </div>
                    </form>
                </Card>
            </AuthLayout>
        </>
    );
}

export default UserEdit;
