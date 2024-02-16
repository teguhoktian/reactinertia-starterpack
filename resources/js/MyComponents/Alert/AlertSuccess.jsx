import React from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useEffect } from "react";

function AlertSuccess({ children, ...props }) {
    const [visible, setVisible] = useState(props.show);
    useEffect(() => {
        setTimeout(
            () => {
                setVisible(false);
            },
            props.delay ? props.delay : 3000
        );
    }, [props.showMessage]);

    if (visible)
        return (
            <>
                <div
                    id="alert-1"
                    className={`flex p-4 mb-3 bg-emerald-100 rounded-lg dark:bg-emerald-200`}
                    role="alert"
                >
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="sr-only">Danger</span>
                    <div className="ml-3 text-sm font-medium text-emerald-700 dark:text-emerald-800">
                        {children}
                    </div>
                    <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-emerald-100 text-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-400 p-1.5 hover:bg-emerald-200 inline-flex h-8 w-8 dark:bg-emerald-200 dark:text-emerald-600 dark:hover:bg-emerald-300"
                        data-dismiss-target="#alert-1"
                        aria-label="Close"
                        onClick={() => setVisible(false)}
                    >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </>
        );
}

export default AlertSuccess;
