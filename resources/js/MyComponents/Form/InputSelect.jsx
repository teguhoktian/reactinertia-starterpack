import React from "react";

function InputSelect({ className, children, ...props }) {
    return (
        <select
            className={`mt-1 py-2 px-4 block w-full border-gray-200 rounded-md text-md focus:border-blue-500 focus:ring-blue-500 text-gray-500 font-medium ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}

export default InputSelect;
