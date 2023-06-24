import React from "react";

function TableCell({ dataLabel, className = "", children, showLabel }) {
    return (
        <>
            <td
                data-label={dataLabel}
                className={
                    `${
                        showLabel &&
                        "before:block before:pb-1 before:text-sm before:uppercase before:font-bold before:content-[attr(data-label)] before:md:content-none before:tex-sm text-left"
                    }  md:text-left block md:table-cell md:whitespace-nowrap text-slate-800 md:first:pl-4 md:last:pr-4 px-4 py-2 ` +
                    className
                }
            >
                {children}
            </td>
        </>
    );
}

export default TableCell;
