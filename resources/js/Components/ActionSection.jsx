import React from "react";
import SectionTitle from "./SectionTitle";

function ActionSection({ children, title, description, aside }) {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 mb-4">
            <SectionTitle
                title={title}
                description={description}
                aside={aside}
            ></SectionTitle>
            <div className="mt-0 md:col-span-2">{children}</div>
        </div>
    );
}

export default ActionSection;
