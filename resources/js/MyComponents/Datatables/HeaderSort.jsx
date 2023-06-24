import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
                    <ExpandMore fontSize="small" />
                )}

                {/* ASC Icon */}
                {field === tkey && direction === "asc" && (
                    <ExpandLess fontSize="small" />
                )}
            </div>
        </>
    );
}

export default HeaderSort;
