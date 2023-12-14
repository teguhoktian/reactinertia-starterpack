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
        name: user.name,
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
            <AuthLayout auth={auth}>
                <Head title={`Edit Pengguna - ${settings.sitename}`} />
                <div className="py-4 px-6 bg-white rounded-md border-gray-200 border">
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
                </div>
            </AuthLayout>
        </>
    );
}

export default UserEdit;
