import ActionSection from "@/Components/ActionSection";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

function BackupIndex({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            site_name: settings.site_name,
            timezone: settings.timezone,
            locale: settings.locale,
            asset_url: settings.asset_url,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("setting.general.store"));
    };

    return (
        <>
            <AuthLayout auth={auth}>
                <Head title={`General Setting - ${settings.site_name}`} />
                <form onSubmit={submit}>
                    <div className="py-4 px-6 bg-white rounded-md border-gray-200 border">
                        <ActionSection
                            title="Site Name"
                            description="Your site name"
                        >
                            <TextInput
                                id="site_name"
                                className="mt-1 block w-full text-sm"
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
                                className="mt-1 block w-full text-sm"
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
                                className="mt-1 block w-full text-sm"
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
                                className="mt-1 block w-full text-sm"
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
                                <p className="text-sm text-emerald-600">
                                    Data Saved.
                                </p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}

export default BackupIndex;
