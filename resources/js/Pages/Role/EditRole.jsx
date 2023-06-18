import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import Card from "@/MyComponents/Card/Card";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

function EditRole({ auth, permissions, role, permission_roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PATCH",
        name: role.name,
        permissions: permission_roles,
    });

    const handleChecked = (e) => {
        if (e.target.checked) {
            setData("permissions", [...data.permissions, e.target.value]);
        } else {
            setData(
                "permissions",
                data.permissions.filter((item) => item !== e.target.name)
            );
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("master.role.update", role.id));
    };
    return (
        <>
            <AuthLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Add Role
                    </h2>
                }
            >
                <Head title="Add Role" />
                <Card>
                    <form onSubmit={submit}>
                        <div className="w-full">
                            <div className="mb-4 space-y-2">
                                <InputLabel className="font-semibold">
                                    Role Name
                                </InputLabel>
                                <TextInput
                                    className="text-sm w-1/3"
                                    name="name"
                                    disabled
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                    }}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <div className="grid grid-cols-4 md:gap-4 gap-2">
                                    {permissions?.map((permission, index) => (
                                        <div key={index} className="text-sm">
                                            <Checkbox
                                                onChange={handleChecked}
                                                value={permission.name}
                                                name={permission.name}
                                                defaultChecked={permission_roles.includes(
                                                    permission.name
                                                )}
                                            />
                                            <span className="ml-3">
                                                {permission.name}{" "}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-row justify-between">
                            <SecondaryButton
                                onClick={() => {
                                    window.history.back();
                                }}
                            >
                                Back
                            </SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Save Role
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </AuthLayout>
        </>
    );
}

export default EditRole;
