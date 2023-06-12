import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";
import { Link } from "@inertiajs/react";

function SubMenu({ menu, ...props }) {
    const pathname = route().current();
    const [subMenuOpen, setSubMenuOpen] = useState(
        pathname.includes(menu.path)
    );
    return (
        <>
            <div className={`${!menu.role && "hidden"}`} key={menu.label}>
                <li
                    key={menu.label}
                    className={`link ${
                        pathname.includes(menu.path) ? "active" : ""
                    } `}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                >
                    {menu.icon && <menu.icon />}
                    <p>{menu.label}</p>
                    <ExpandMore
                        className={`${
                            subMenuOpen && "rotate-180"
                        } duration-200`}
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
                    className="flex flex-col pl-[48px] text-[0.7rem] h-0 overflow-hidden"
                >
                    {menu.submenu.map((sm) => (
                        <li key={sm.label} onClick={props.props.toggle}>
                            <Link
                                href={`${menu.path}/${sm.path}`}
                                className="link"
                            >
                                {sm.label}
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </>
    );
}

export default SubMenu;
