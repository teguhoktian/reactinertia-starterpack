import React from "react";
import SearchTable from "./SearchTable";

function SearchControl({ search, onHandleChange, ...props }) {
    return (
        <>
            <SearchTable
                onChange={onHandleChange}
                type="search"
                value={search}
                {...props}
            ></SearchTable>
        </>
    );
}

export default SearchControl;
