import { Link } from "@inertiajs/react";
import React from "react";
import "./Sidebar.css";
import SubMenu from "./SubMenu";
import menus from "./menu.js";
import { hasRole } from "@/utils/permissions";
import { Square3Stack3DIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Sidebar({ auth, logout, ...props }) {
    const showMenu = (menuRoles, userRoles) => {
        return menuRoles?.length > 0 ? hasRole(menuRoles, userRoles) : true;
    };

    return (
        <>
            <div
                id="sidebarShadow"
                className="fixed inset-0 z-50 transition-opacity bg-black opacity-50 md:hidden hidden"
                onClick={props.toggle}
            />
            <div
                id="sidebar"
                className="md:flex w-72 flex-col fixed inset-y-0 z-50 transition md:translate-x-0 -translate-x-full ease-in"
            >
                <aside
                    className={` pb-4 h-screen px-6 bg-indigo-600 overflow-y-auto gap-y-5 flex-col flex ${props.className}`}
                >
                    <div className="flex flex-row h-16 py-4 mb-4 px-2">
                        <Link
                            href="/"
                            className="flex text-xl font-medium whitespace-nowrap self-center"
                        >
                            <Square3Stack3DIcon className="mr-2 w-7 h-7 text-white"></Square3Stack3DIcon>{" "}
                            <p className="font-semibold text-white px-1 text-2xl">
                                InertiaReact
                            </p>
                        </Link>
                        <button
                            onClick={props.toggle}
                            className="absolute right-3 top-4 md:hidden"
                        >
                            <XMarkIcon className="w-8 h-8 text-white"></XMarkIcon>
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col">
                        <ul id="menu" className="text-gray-400 space-y-2">
                            {menus?.map((menu, index) =>
                                menu.submenu ? (
                                    <SubMenu
                                        key={index}
                                        menu={menu}
                                        props={props}
                                        showMenu={showMenu}
                                        auth={auth}
                                    />
                                ) : menu.path ? (
                                    <div key={index}>
                                        {showMenu(menu.role, auth.roles) && (
                                            <li
                                                key={index}
                                                className={`${""}`}
                                                onClick={props.toggle}
                                            >
                                                <Link
                                                    href={`${menu.path}`}
                                                    className={`leading-6 font-semibold text-sm p-2 rounded-md gap-x-3 flex hover:bg-indigo-700 hover:text-white ${
                                                        route().current() ==
                                                        menu.route
                                                            ? " text-white"
                                                            : "text-indigo-200"
                                                    }`}
                                                >
                                                    {menu.icon && (
                                                        <menu.icon className="" />
                                                    )}
                                                    <span>{menu.label}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </div>
                                ) : (
                                    <li key={index} className="mt-5 mb-3">
                                        <span className="text-gray-500 font-medium uppercase text-xs mx-2">
                                            {menu.label} {menu.role}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Sidebar;
