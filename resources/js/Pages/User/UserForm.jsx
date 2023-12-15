import React from "react";
import InputError from "@/Components/InputError";
import InputSelect from "@/MyComponents/Form/InputSelect";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

function UserForm({ data, setData, errors, roles }) {
    return (
        <>
            <div className="">
                <InputLabel className="mb-2" htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    className="mt-1 block w-full text-sm"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="mt-4">
                <InputLabel className="mb-2" htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full text-sm"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    isFocused
                    autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="mt-4">
                <InputLabel
                    className="mb-2"
                    htmlFor="username"
                    value="Username"
                />
                <TextInput
                    id="username"
                    className="mt-1 block w-full text-sm"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    required
                    isFocused
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.username} />
            </div>

            <div className="mt-4">
                <InputLabel className="mb-2" htmlFor="role" value="Role" />
                <InputSelect
                    className="text-sm"
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
