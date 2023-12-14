import React from "react";

function InputSelect({ className, children, ...props }) {
    return (
        <select
            className={`mt-1  block w-full border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500  ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}

export default InputSelect;
