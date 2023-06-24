import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputSelect from "@/MyComponents/Form/InputSelect";
import TextInput from "@/Components/TextInput";

function UserForm({ data, setData, errors, roles }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="firstname" value="First Name" />
                    <TextInput
                        id="firstname"
                        className="mt-1 block w-full"
                        value={data.firstname}
                        onChange={(e) => setData("firstname", e.target.value)}
                        required
                        isFocused
                        autoComplete="firstname"
                    />

                    <InputError className="mt-2" message={errors.firstname} />
                </div>

                <div className="">
                    <InputLabel htmlFor="lastname" value="Last Name" />
                    <TextInput
                        id="lastname"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        onChange={(e) => setData("lastname", e.target.value)}
                        required
                        isFocused
                        autoComplete="lastname"
                    />

                    <InputError className="mt-2" message={errors.lastname} />
                </div>
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    isFocused
                    autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="username" value="Username" />
                <TextInput
                    id="username"
                    className="mt-1 block w-full"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    required
                    isFocused
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.username} />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="role" value="Role" />
                <InputSelect
                    placeholder="--Pilih--"
                    defaultValue={data.role[0]}
                    onChange={(e) => setData("role", e.target.value)}
                >
                    <option></option>
                    {roles?.map((role, index) => (
                        <option value={role} key={index}>
                            {role}
                        </option>
                    ))}
                </InputSelect>
                <InputError className="mt-2" message={errors.role} />
            </div>
        </>
    );
}

export default UserForm;
