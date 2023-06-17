import React from "react";

function Card({ header, description, children }) {
    return (
        <>
            <div className="flex flex-col border border-gray-300 bg-white">
                {/* Header */}
                {header && (
                    <div className="border-b bg-gray-100 border-gray-300 md:px-8 px-4 py-4 flex flex-col">
                        <strong>{header}</strong>
                        {description && <small>{description}</small>}
                    </div>
                )}
                {/* Body */}
                <div className="p-4 md:p-8">{children}</div>
            </div>
        </>
    );
}

export default Card;
