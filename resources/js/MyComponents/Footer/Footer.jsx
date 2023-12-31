import React from "react";

function Footer() {
    return (
        <div className="flex flex-row bg-white items-center justify-between px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
            <div>Copyright &copy; 2023</div>
            <div>
                Developed by{" "}
                <a
                    className="text-indigo-400 font-semibold"
                    href="https://raincode.my.id/"
                >
                    Raincode.My.Id
                </a>
            </div>
        </div>
    );
}

export default Footer;
