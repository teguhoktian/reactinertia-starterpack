import React from "react";

function TableRow({ className, children, ...props }) {
    return (
        <>
            <tr
                {...props}
                className={`bg-white md:border mb-4 border-b block md:table-row md:shadow-none ${className}`}
            >
                {children}
            </tr>
        </>
    );
}

export default TableRow;
