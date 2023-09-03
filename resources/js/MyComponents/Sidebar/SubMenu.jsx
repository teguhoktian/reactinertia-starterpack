import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function SubMenu({ menu, showMenu, auth, ...props }) {
    const [subMenuOpen, setSubMenuOpen] = useState(
        route().current().startsWith(menu.route)
    );
    return (
        <>
            {showMenu(menu.role, auth.roles) && (
                <div key={menu.label}>
                    <li
                        key={menu.label}
                        className={`link ${
                            route().current().startsWith(menu.route)
                                ? "active"
                                : ""
                        } `}
                        onClick={() => setSubMenuOpen(!subMenuOpen)}
                    >
                        {menu.icon && <menu.icon className="w-6 h-6" />}
                        <p className="flex-1">{menu.label}</p>
                        <ChevronDownIcon
                            className={`${
                                subMenuOpen && "rotate-180"
                            } duration-200 w-5 h-5`}
                        />
                    </li>
                    <motion.ul
                        animate={
                            subMenuOpen
                                ? {
                                      height: "fit-content",
                                  }
                                : {
                                      height: 0,
                                  }
                        }
                        className="flex flex-col pl-9 text-[0.7rem] h-0 overflow-hidden"
                    >
                        {menu.submenu.map((sm, index) => (
                            <li key={index} onClick={props.props.toggle}>
                                <Link
                                    key={index}
                                    href={`${menu.path}/${sm.path}`}
                                    className={`link ${
                                        route().current().includes(sm.route) &&
                                        "active"
                                    }`}
                                >
                                    {sm.label}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                </div>
            )}
        </>
    );
}

export default SubMenu;
