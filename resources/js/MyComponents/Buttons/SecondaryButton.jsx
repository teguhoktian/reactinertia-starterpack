import React from "react";

function SecondaryButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `flex items-center gap-2 rounded text-gray-700 bg-gray-100 py-2 px-4 font-medium  hover:bg-opacity-80 ${
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
