import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React from "react";

function HeaderSort({ tkey, label, field, direction, handleSort }) {
    return (
        <>
            <div
                className="inline-flex cursor-pointer w-full justify-between items-center"
                onClick={() => handleSort(tkey, direction)}
            >
                <span>{label}</span>

                {/* DESC Icon */}
                {field === tkey && direction === "desc" && (
                    <ChevronDownIcon className="w-4 h-4" />
                )}

                {/* ASC Icon */}
                {field === tkey && direction === "asc" && (
                    <ChevronUpIcon className="w-4 h-4" />
                )}
            </div>
        </>
    );
}

export default HeaderSort;
