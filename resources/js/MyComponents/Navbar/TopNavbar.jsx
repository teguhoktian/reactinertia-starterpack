import Dropdown from "@/Components/Dropdown";
import React from "react";
import AvatarLetter from "./AvatarLetter";
import {
    Bars3Icon,
    ChevronDownIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

function TopNavbar({ auth, header, ...props }) {
    return (
        <>
            <div className="text-sm bg-white absolute w-full flex items-center justify-between lg:p-6 p-3 h-14 space-x-2 border-b border-gray-200 z-40">
                <div className="flex flex-row items-center gap-2">
                    <span
                        className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                        onClick={props.toggle}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </span>
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                {auth.user.profile_image ? (
                                    <img
                                        src={`/storage/${auth.user.profile_image}`}
                                        className="hover:cursor-pointer w-10 h-10 rounded-full object-cover border border-gray-200 shadow-md"
                                    />
                                ) : (
                                    <AvatarLetter name={auth.user.name} />
                                )}
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}

export default TopNavbar;
