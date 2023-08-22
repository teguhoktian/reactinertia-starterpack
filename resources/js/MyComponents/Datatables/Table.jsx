import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Paginate from "./Paginate";
import SearchControl from "./SearchControl";
import { router } from "@inertiajs/react";
import _ from "lodash";

function Table({ collections, filters, header, children } = {}) {
    const [search, setSearch] = useState(filters?.search || "");
    const [page, setPage] = useState(collections?.current_page || 1);
    const [field, setField] = useState(filters?.field || null);
    const [direction, setDirection] = useState(filters?.direction || null);
    const [perpage, setPerpage] = useState(
        filters?.perpage || collections.per_page
    );

    const isFirstRender = useRef(true);

    useEffect(() => {
        // Dont Effect on First render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        searchAction({ search, page, perpage, field, direction });
    }, [search, page, perpage, field, direction]);

    const searchAction = useCallback(
        _.debounce(({ search, page, perpage, field, direction }) => {
            let params = {
                search,
                page,
                perpage,
                field,
                direction,
            };

            let doParams = _.pickBy(params);

            router.get(route(route().current()), doParams, {
                preserveState: true,
                replace: true,
            });
        }, 500),
        []
    );

    const handleSort = (field, direction) => {
        setField(field);
        setDirection(direction === "asc" ? "desc" : "asc");
    };
    const handlePerpage = (e) => {
        setPerpage(e.target.value);
    };
    const onHandleChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
    return (
        <div className="">
            <div className="pb-4 text-center md:text-start block md:flex md:justify-between md:items-center">
                <div className="flex-1 leading-5 md:mb-0 mb-2 space-x-1 text-sm">
                    <label>Show </label>
                    <select
                        aria-controls="example"
                        className="border-gray-200 text-gray-500 text-sm shadow-sm rounded-sm"
                        onChange={handlePerpage}
                        value={perpage}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <label>entries</label>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                    <label>Search: </label>
                    <SearchControl
                        search={search}
                        onHandleChange={onHandleChange}
                        className="mt-1 block w-full text-sm"
                    />
                </div>
            </div>

            <div className="overflow-x-auto  border md:border-none p-4 md:p-0">
                <table
                    className={`block md:table w-full text-sm text-left text-gray-500`}
                >
                    <Header
                        data={header}
                        handleSort={handleSort}
                        direction={direction}
                        field={field}
                    ></Header>
                    <tbody className="block md:table-row-group sm:grid sm:grid-cols-2 sm:gap-4">
                        {children}
                    </tbody>
                </table>
            </div>

            {/* Paging */}

            <Paginate collections={collections} className="space-y-6 pt-4" />
        </div>
    );
}

export default Table;
