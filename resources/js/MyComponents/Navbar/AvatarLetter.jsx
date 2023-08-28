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

function AvatarLetter({ name }) {
    return (
        <>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
                </span>
            </div>
        </>
    );
}

export default AvatarLetter;
