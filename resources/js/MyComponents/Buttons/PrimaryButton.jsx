import React from "react";

function PrimaryButton({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `flex items-center gap-2 rounded bg-blue-600 py-2 px-4 font-medium text-white text-sm hover:bg-opacity-80 ${
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
