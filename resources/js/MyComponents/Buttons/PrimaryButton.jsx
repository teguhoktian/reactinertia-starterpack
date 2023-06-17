import React from "react";

function PrimaryButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border rounded-md p-2 bg-indigo-600 text-gray-100 border-indigo-400 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
