import React from "react";
import HeaderSort from "./HeaderSort";

function Header({ data, handleSort, direction, field } = {}) {
    return (
        <>
            <thead className="hidden bg-slate-100 md:table-header-group text-gray-600 border boder-gray-400">
                <tr className="block md:table-row">
                    {data.map((row) => (
                        <th
                            scope="col"
                            key={row.key}
                            className={`py-3 px-4 block md:table-cell font-semibold text-medium uppercase  `}
                        >
                            {!row.sort ? (
                                <span>{row.label}</span>
                            ) : (
                                <HeaderSort
                                    label={row.label}
                                    handleSort={handleSort}
                                    tkey={row.key}
                                    direction={direction}
                                    field={field}
                                />
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}

export default Header;
