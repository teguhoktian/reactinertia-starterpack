import AuthLayout from "@/Layouts/AuthLayout";
import { Transition } from "@headlessui/react";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";
import UserForm from "./UserForm";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function UserAdd({ auth, roles, settings }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: "",
        username: "",
        email: "",
        role: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("master.user.store"));
    };
    return (
        <>
            <AuthLayout auth={auth}>
                <Head title={`Tambah Pengguna - ${settings.sitename}`} />
                <div className="py-4 px-6 bg-white rounded-md border-gray-200 border">
                    <SecondaryButton
                        className="mb-4"
                        onClick={(e) => {
                            router.visit(route("master.user.index"));
                        }}
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
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
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}

export default UserAdd;
