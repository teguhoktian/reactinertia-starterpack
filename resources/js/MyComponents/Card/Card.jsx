import React from "react";

function Card({ header, description, children, className }) {
    return (
        <>
            <div className={`flex flex-col rounded-md ${className}`}>
                {/* Header */}
                {header && (
                    <div
                        className={`border-b bg-gray-100 border-gray-300 md:px-8 px-4 py-4 flex flex-col`}
                    >
                        <strong>{header}</strong>
                        {description && <small>{description}</small>}
                    </div>
                )}
                {/* Body */}
                <div className="px-4">{children}</div>
            </div>
        </>
    );
}

export default Card;
