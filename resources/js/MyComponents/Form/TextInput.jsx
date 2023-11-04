import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-200 bg-transparent text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded font-medium outline-none border-[1.5px]" +
                className
            }
            ref={input}
        />
    );
});
