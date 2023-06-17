import Dropdown from "@/Components/Dropdown";
import { ExpandMore, Menu, WebAsset } from "@mui/icons-material";
import React from "react";
import AvatarLetter from "./AvatarLetter";

function TopNavbar({ user, header, ...props }) {
    return (
        <>
            <div className="text-sm sticky w-full flex items-center justify-between bg-white lg:p-8 p-4 h-16 border-b border-gray-200 space-x-2 shadow-sm">
                <div className="flex flex-row items-center gap-2">
                    <span
                        className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={props.toggle}
                    >
                        <Menu />
                    </span>
                    <WebAsset /> {header && <span>{header}</span>}
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <AvatarLetter
                                    name={user.firstname + " " + user.lastname}
                                />
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    Hi, {user.firstname}
                                    <ExpandMore />
                                </button>
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
