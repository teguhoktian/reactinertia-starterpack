import React from "react";

function SecondaryButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border rounded-md p-2 bg-gray-500 text-gray-100 border-gray-400 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default SecondaryButton;
