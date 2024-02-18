import { Link } from "@inertiajs/react";
import React from "react";
import SecondaryButton from "../Buttons/SecondaryButton";

function Paginate({ collections, className }) {
    const getClassName = (active) => {
        return active
            ? "px-3 py-2 text-sm leading-4 focus:border-primary focus:text-primary bg-blue-700 text-white"
            : "px-3 py-2 text-sm leading-4 hover:bg-white focus:border-primary focus:text-primary";
    };

    return (
        <div className={`${className}`}>
            {collections.meta.links.length > 0 && (
                <div className="text-center lg:text-start block lg:flex lg:justify-between lg:items-center text-sm">
                    {collections.meta.total > 0 && (
                        <div className="flex-1 leading-5 md:mb-0 mb-2">
                            Showing data: {collections.meta.from} to{" "}
                            {collections.meta.to} of {collections.meta.total}
                        </div>
                    )}
                    <div className="flex items-center justify-center">
                        <div className="inline-flex flex-wrap rounded-lg lg:hidden justify-between w-full">
                            {collections.links.prev && (
                                <SecondaryButton>
                                    <Link
                                        className=""
                                        href={collections.links.prev}
                                        key={""}
                                        charSet="utf-8"
                                    >
                                        Previous
                                    </Link>
                                </SecondaryButton>
                            )}
                            {collections.links.next && (
                                <SecondaryButton>
                                    <Link
                                        className=""
                                        href={collections.links.next}
                                        key={""}
                                        charSet="utf-8"
                                    >
                                        Next
                                    </Link>
                                </SecondaryButton>
                            )}
                        </div>
                        <div className="lg:inline-flex flex-wrap rounded-lg border hidden">
                            {collections.meta.links.map((link, key) =>
                                link.url === null ? (
                                    <div
                                        className="px-3 py-2 text-sm leading-4 text-gray-400"
                                        key={key}
                                    >
                                        {link.label.replace(
                                            /\&raquo;|\&laquo;/g,
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        className={getClassName(link.active)}
                                        href={link.url}
                                        key={key}
                                        charSet="utf-8"
                                    >
                                        {link.label.replace(
                                            /\&raquo;|\&laquo;/g,
                                            ""
                                        )}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paginate;
