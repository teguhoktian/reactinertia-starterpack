import Footer from "@/MyComponents/Footer/Footer";
import TopNavbar from "@/MyComponents/Navbar/TopNavbar";
import Sidebar from "@/MyComponents/Sidebar/Sidebar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { sidebarToggle } from "@/utils/toggler";
import { motion } from "framer-motion";

function AuthLayout({ auth, header, children }) {
    const isDesktop = () => document.body.clientWidth > 768;
    const [sidebarStatus, setSidebarStatus] = useState("");

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSidebarStatus(isDesktop());
        });
        return () => window.removeEventListener("resize", isDesktop);
    }, []);

    useLayoutEffect(() => {
        //console.log(sidebarStatus);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Sidebar
                auth={auth}
                toggle={sidebarToggle}
                className={sidebarStatus ? "" : "mobile"}
            />

            <div className="md:pl-72">
                <TopNavbar auth={auth} header={header} toggle={sidebarToggle} />
                <div className="py-12">
                    <motion.div
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className=" md:px-3 lg:px-3 pb-6 pt-3"
                    >
                        <div className="max-w-7xl mx-auto sm:px-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
