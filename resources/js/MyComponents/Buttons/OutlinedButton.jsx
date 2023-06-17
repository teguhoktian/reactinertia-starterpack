import React from "react";

function OutlinedButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border rounded-md p-2 bg-white text-indigo-700 border-indigo-200 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default OutlinedButton;
