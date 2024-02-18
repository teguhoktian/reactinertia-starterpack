import React from "react";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            fontSize: "0.8rem",
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

function AvatarLetter({ name, className = "w-10 h-10 font-medium" }) {
    return (
        <>
            <div
                className={
                    `relative inline-flex items-center justify-center overflow-hidden bg-indigo-50 rounded-full  border-gray-200 border cursor-pointer ` +
                    className
                }
            >
                <span className=" text-gray-700 dark:text-indigo-400 text-base cursor-pointer">
                    {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
                </span>
            </div>
        </>
    );
}

export default AvatarLetter;
