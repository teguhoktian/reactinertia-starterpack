import React from "react";

function DangerButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border rounded-md p-2 bg-red-600 text-gray-100 border-red-400 ${
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
