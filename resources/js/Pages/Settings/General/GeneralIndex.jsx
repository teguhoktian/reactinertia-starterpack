import ActionSection from "@/Components/ActionSection";
import InputError from "@/Components/InputError";
import TextInput from "@/MyComponents/Form/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import Card from "@/MyComponents/Card/Card";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

function BackupIndex({ auth, settings }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        site_name: settings.site_name,
        timezone: settings.timezone,
        locale: settings.locale,
        asset_url: settings.asset_url,
    });

    const [showMessage, setShowMessage] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("setting.general.store"));
    };

    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-base text-gray-800 leading-tight">
                        General Settings
                    </h2>
                }
            >
                <Head title={`General Setting - ${settings.site_name}`} />
                {showMessage && (
                    <Alert
                        className="mb-4"
                        action={
                            <IconButton size="small">
                                <Close
                                    onClick={() => {
                                        setShowMessage(false);
                                    }}
                                ></Close>
                            </IconButton>
                        }
                        severity="success"
                    >
                        {flash.message}
                    </Alert>
                )}
                <form onSubmit={submit}>
                    <Card>
                        <ActionSection
                            title="Site Name"
                            description="Your site name"
                        >
                            <TextInput
                                id="site_name"
                                className="mt-1 block w-full"
                                value={data.site_name}
                                onChange={(e) =>
                                    setData("site_name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="site_name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.site_name}
                            />
                        </ActionSection>

                        <ActionSection title="Asset URL">
                            <TextInput
                                id="asset_url"
                                className="mt-1 block w-full"
                                value={data.asset_url}
                                onChange={(e) =>
                                    setData("asset_url", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="asset_url"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.asset_url}
                            />
                        </ActionSection>

                        <ActionSection title="Time Zone">
                            <TextInput
                                id="timezone"
                                className="mt-1 block w-full"
                                value={data.timezone}
                                onChange={(e) =>
                                    setData("timezone", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="timezone"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.timezone}
                            />
                        </ActionSection>

                        <ActionSection title="Locale">
                            <TextInput
                                id="locale"
                                className="mt-1 block w-full"
                                value={data.locale}
                                onChange={(e) =>
                                    setData("locale", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="locale"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.locale}
                            />
                        </ActionSection>
                        <div className="flex items-center gap-4 mt-4">
                            <PrimaryButton disabled={processing}>
                                {processing ? "Please Wait..." : "Simpan"}
                            </PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">
                                    Data Saved.
                                </p>
                            </Transition>
                        </div>
                    </Card>
                </form>
            </AuthLayout>
        </>
    );
}

export default BackupIndex;
