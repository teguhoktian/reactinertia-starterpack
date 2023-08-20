import React from "react";

function SectionTitle({ title, description, aside }) {
    return (
        <div className="md:col-span-1 flex justify-between items-center">
            <div className="px-0">
                <h3 className="text-medium font-medium text-gray-900">
                    {title}
                </h3>

                {description && (
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            <div className="px-0">{aside}</div>
        </div>
    );
}

export default SectionTitle;
