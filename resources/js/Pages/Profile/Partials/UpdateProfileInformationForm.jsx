import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import AvatarLetter from "@/MyComponents/Navbar/AvatarLetter";
import { useState } from "react";
import DangerButton from "@/Components/DangerButton";
import { useRef } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const imageProfile = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            image: null,
            preview: user.profile_image || null,
            remove_image: false,
            _method: "PATCH", // Inertia File tidak support PUT
        });

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setData("image", file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // patch(route("profile.update")); Inertia File not Supported PUT
        setData("image", null);
        post(route("profile.update"));
    };
    console.log(data);
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid gap-4 grid-cols-1 justify-between w-full">
                    <div>
                        <InputLabel
                            htmlFor="profile_image"
                            value="Profile Image"
                        />
                        {!data.preview && !selectedImage ? (
                            <AvatarLetter
                                className="w-20 h-20 text-2xl"
                                name={user.name}
                            />
                        ) : (
                            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={`/storage/${data.preview}`}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                )}
                            </span>
                        )}
                        <div className="flex gap-2 mt-2">
                            <TextInput
                                type="file"
                                id="profilePhoto"
                                accept="image/*"
                                ref={imageProfile}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <PrimaryButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    imageProfile.current.click();
                                }}
                            >
                                Browse Image
                            </PrimaryButton>
                            {(data.preview || selectedImage) && (
                                <DangerButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // setData("remove_image", true);
                                        // setData("preview", null);
                                        setData((prevState) => ({
                                            ...prevState,
                                            preview: null,
                                            remove_image: true,
                                        }));

                                        setSelectedImage(null);
                                        imageProfile.current.value = "";
                                    }}
                                >
                                    Remove Image
                                </DangerButton>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
        </section>
    );
}
