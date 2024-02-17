import React from "react";

function SecondaryButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `flex rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 border border-gray-300  text-gray-700  shadow-sm hover:border-blue-300 focus-visible:outline items-center focus-visible:outline-2 focus-visible:outline-offset-2   ${
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
