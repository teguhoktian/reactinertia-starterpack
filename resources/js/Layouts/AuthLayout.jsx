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
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <Sidebar
                auth={auth}
                toggle={sidebarToggle}
                className={sidebarStatus ? "" : "mobile"}
            />

            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-scroll no-scrollbar mx-auto">
                <TopNavbar auth={auth} header={header} toggle={sidebarToggle} />
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="mb-auto md:px-4 lg:px-4 pb-6 pt-5"
                >
                    {children}
                </motion.div>
                <Footer />
            </div>
        </div>
    );
}

export default AuthLayout;
