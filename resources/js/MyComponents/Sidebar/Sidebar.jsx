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
                className="absolute inset-0 bg-gray-500/75 z-50 hidden"
                onClick={props.toggle}
            />
            <aside
                id="sidebar"
                className={` bg-slate-900 absolute flex flex-col left-0 top-0 md:static md:left-auto md:top-auto md:translate-x-0 h-screen overflow-y-scroll md:overflow-y-auto no-scrollbar w-72 shrink-0 transition-all duration-200 ease-in-out -translate-x-72 z-50 text-gray-400 ${props.className}`}
            >
                <div className="flex flex-row items-center h-16 py-4 mb-4 px-6 ">
                    <Link
                        href="/"
                        className="flex items-center text-xl font-medium whitespace-nowrap self-center"
                    >
                        <Square3Stack3DIcon className="mr-2 w-6 h-6 text-indigo-600"></Square3Stack3DIcon>{" "}
                        <p className="font-semibold text-gray-100 px-1">
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

                <div className="flex flex-col h-full px-3">
                    <ul id="menu" className="">
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
                                                        menu.route && "active"
                                                }`}
                                            >
                                                {menu.icon && (
                                                    <menu.icon className="w-6 h-6" />
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
        </>
    );
}

export default Sidebar;
