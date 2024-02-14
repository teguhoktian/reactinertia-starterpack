import Dropdown from "@/Components/Dropdown";
import React from "react";
import AvatarLetter from "./AvatarLetter";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function TopNavbar({ auth, header, ...props }) {
    return (
        <>
            <div className="lg:px-8 sm:px-6 sm:gap-x-6 px-4 shadow-sm bg-white border-gray-200 border-b-[1px] gap-x-4 items-center h-16 flex z-40 top-0 sticky">
                <button
                    className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                    onClick={props.toggle}
                >
                    <Bars4Icon className="w-6 h-6" />
                </button>
                <div className="bg-gray-200 block md:hidden w-[1px] h-6"></div>

                <div className="flex flex-1 relative">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            name="search_global"
                            autocomplete="off"
                            class="placeholder:text-gray-400 border-none text-gray-700 focus:ring-0 text-sm focus:border-primary-500 block w-full pl-10 p-2"
                        />
                    </div>
                </div>

                <div class="lg:bg-gray-200 hidden lg:block lg:w-[1px] lg:h-6"></div>

                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="flex items-center gap-x-3 text-right pr-2 hover:cursor-pointer text-sm">
                                {auth.user.profile_image ? (
                                    <img
                                        src={`/storage/${auth.user.profile_image}`}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-md"
                                    />
                                ) : (
                                    <AvatarLetter name={auth.user.name} />
                                )}

                                <div class="md:flex md:flex-col hidden">
                                    <div class="">{auth.user.name}</div>
                                    <div class="text-xs text-gray-400">
                                        {auth.user.email}
                                    </div>
                                </div>
                            </div>
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
