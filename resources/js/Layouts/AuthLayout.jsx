import Footer from "@/MyComponents/Footer/Footer";
import TopNavbar from "@/MyComponents/Navbar/TopNavbar";
import Sidebar from "@/MyComponents/Sidebar/Sidebar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { sidebarToggle } from "@/utils/toggler";

function AuthLayout({ user, header, children }) {
    const isDesktop = () => document.body.clientWidth > 768;
    const [sidebarStatus, setSidebarStatus] = useState("");

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSidebarStatus(isDesktop());
        });
        return () => window.removeEventListener("resize", isDesktop);
    }, []);

    useLayoutEffect(() => {
        console.log(sidebarStatus);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <Sidebar
                toggle={sidebarToggle}
                className={sidebarStatus ? "" : "mobile"}
            />

            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-scroll no-scrollbar mx-auto">
                <TopNavbar user={user} header={header} toggle={sidebarToggle} />
                <div className="mb-auto md:px-6 lg:px-8 pb-6 pt-5 md:py-6">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default AuthLayout;
