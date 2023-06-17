import { Link } from "@inertiajs/react";
import { ArrowBack, Copyright, Layers, Twitter } from "@mui/icons-material";
import React from "react";
import "./Sidebar.css";
import SubMenu from "./SubMenu";
import menus from "./menu.js";

function Sidebar({ user, logout, ...props }) {
    return (
        <>
            <aside
                id="sidebar"
                className={`bg-slate-800 absolute flex flex-col left-0 top-0 md:static md:left-auto md:top-auto md:translate-x-0 h-screen overflow-y-scroll md:overflow-y-auto no-scrollbar w-64 shrink-0 transition-all duration-200 ease-in-out -translate-x-64 z-40 ${props.className}`}
            >
                <div className="flex flex-row items-center h-16 p-4 border-b border-gray-700 border-s-white">
                    <Link
                        href="/"
                        className="flex items-center text-gray-200 text-2xl font-medium whitespace-nowrap self-center"
                    >
                        <Layers className="mr-2 text-indigo-600"></Layers>{" "}
                        e-nventory
                    </Link>
                    <button
                        onClick={props.toggle}
                        className="absolute right-4 top-5 md:hidden"
                    >
                        <ArrowBack className="w-8 h-8 rounded-lg bg-white border"></ArrowBack>
                    </button>
                </div>

                <div className="flex flex-col h-full p-4">
                    <ul id="menu" className="">
                        {menus?.map((menu) =>
                            menu.submenu ? (
                                <SubMenu
                                    key={menu.label}
                                    menu={menu}
                                    props={props}
                                />
                            ) : menu.path ? (
                                <li
                                    key={menu.label}
                                    className={`${!menu.role && "hidden"}`}
                                    onClick={props.toggle}
                                >
                                    <Link
                                        href={`${menu.path}`}
                                        className={`link ${
                                            route().current() == menu.route &&
                                            "active"
                                        }`}
                                    >
                                        {menu.icon && <menu.icon />}
                                        <span>{menu.label}</span>
                                    </Link>
                                </li>
                            ) : (
                                <li key={menu.label} className="mt-5 mb-3">
                                    <span className="text-gray-500 font-medium uppercase text-xs mx-2">
                                        {menu.label} {menu.role}
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="border-t border-gray-700">
                    <div className="px-2 py-3 text-indigo-50 text-xs">
                        <span className="text-indigo-300">PurpleRainTheme</span>{" "}
                        by
                        <span className="text-semibold text-cyan-400">
                            {" "}
                            <a
                                href="https://twitter.com/teguhoktian"
                                target="_blank"
                            >
                                TeguhOktian
                                <Twitter />
                            </a>
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
