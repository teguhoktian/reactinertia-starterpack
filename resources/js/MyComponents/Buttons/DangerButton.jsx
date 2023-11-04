import React from "react";

function DangerButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `flex items-center gap-2 rounded text-white bg-red-600 py-2 px-4 font-medium text-sm hover:bg-opacity-80 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default DangerButton;
