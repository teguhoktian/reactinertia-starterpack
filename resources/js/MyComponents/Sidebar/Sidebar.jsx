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
                    className={` pb-4 h-screen px-6 bg-slate-900 overflow-y-auto gap-y-5 flex-col flex ${props.className}`}
                >
                    <div className="flex flex-row h-16 py-4 mb-4 px-2">
                        <Link
                            href="/"
                            className="flex text-xl font-medium whitespace-nowrap self-center"
                        >
                            <Square3Stack3DIcon className="mr-2 w-6 h-6 text-indigo-600"></Square3Stack3DIcon>{" "}
                            <p className="font-semibold text-gray-100 px-1 text-2xl">
                                InertiaReact
                            </p>
                        </Link>
                        <button
                            onClick={props.toggle}
                            className="absolute right-3 top-4 md:hidden"
                        >
                            <XMarkIcon className="w-8 h-8"></XMarkIcon>
                        </button>
                    </div>

                    <div className="flex flex-col h-full">
                        <ul id="menu" className="text-gray-400">
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
                                                    className={`link ${
                                                        route().current() ==
                                                            menu.route &&
                                                        "active"
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
