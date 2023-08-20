import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import { Transition } from "@headlessui/react";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";
import UserForm from "./UserForm";
import { ArrowBack } from "@mui/icons-material";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";

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
        firstname: "",
        lastname: "",
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
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Pengguna
                    </h2>
                }
            >
                <Head title={`Tambah Pengguna - ${settings.sitename}`} />
                <Card>
                    <SecondaryButton
                        className="mb-4"
                        onClick={(e) => {
                            router.visit(route("master.user.index"));
                        }}
                    >
                        <ArrowBack fontSize="small" />
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
                </Card>
            </AuthLayout>
        </>
    );
}

export default UserAdd;
