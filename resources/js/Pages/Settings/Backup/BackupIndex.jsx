import Dropdown from "@/Components/Dropdown";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";
import AuthLayout from "@/Layouts/AuthLayout";
import AlertSuccess from "@/MyComponents/Alert/AlertSuccess";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    TrashIcon,
    XCircleIcon,
    InboxStackIcon,
    Bars3Icon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function BackupIndex({
    auth,
    // backupStatuses,
    disks,
    activeDisk,
    // files,
    flash,
    settings,
}) {
    const [checkedDisk, setCheckedDisk] = useState(activeDisk || "");
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [backupStatuses, setBackupStatuses] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getBackupStatuses();
        getBackupFiles();
    }, [checkedDisk]);

    const getBackupStatuses = async () => {
        try {
            const responses = await axios.get(
                route("setting.backup.backupStatuses")
            );
            setBackupStatuses(responses.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBackupFiles = async () => {
        try {
            const responses = await axios.get(
                route("setting.backup.getFiles", { disk: checkedDisk })
            );
            setFiles(responses.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (value) => {
        setCheckedDisk(value);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(
                route("setting.backup.delete", {
                    index_file: id,
                    disk: checkedDisk,
                }),
                {
                    onStart: (visit) => {
                        setLoading(true);
                        setShowMessage(false);
                    },
                    onSuccess: (page) => {
                        getBackupStatuses();
                        getBackupFiles();
                        setShowMessage(true);
                        setLoading(false);
                    },
                }
            );
        }
    };

    const createBackup = (option) => {
        router.post(route("setting.backup.create"), option, {
            onStart: (visit) => {
                setLoading(true);
                setShowMessage(false);
            },
            onSuccess: (page) => {
                setShowMessage(true);
                setLoading(false);
            },
        });
    };

    return (
        <>
            <AuthLayout auth={auth}>
                <Head title={`Backup DB - ${settings.sitename}`} />
                {showMessage && (
                    <AlertSuccess show={showMessage}>
                        {flash.message}
                    </AlertSuccess>
                )}
                <div className="mb-4 flex gap-2"></div>
                <div className="py-4 px-6 bg-white rounded-md border-gray-200 border">
                    <div className="mb-4 flex justify-end gap-2">
                        <PrimaryButton
                            disabled={loading}
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                createBackup({ option: "" });
                            }}
                        >
                            <span>Cadangkan</span>
                        </PrimaryButton>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <SecondaryButton className="">
                                    <Bars3Icon className="h-6 w-6"></Bars3Icon>
                                </SecondaryButton>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right">
                                <Dropdown.Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        createBackup({ option: "only-db" });
                                    }}
                                >
                                    Create DB Backup
                                </Dropdown.Link>
                                <Dropdown.Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        createBackup({ option: "only-file" });
                                    }}
                                >
                                    Create Files Backup
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                        <PrimaryButton
                            onClick={(e) => {
                                getBackupStatuses();
                            }}
                        >
                            <ArrowPathIcon className="w-6 h-6"></ArrowPathIcon>
                        </PrimaryButton>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-sm text-left">
                            <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                                <tr>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Disk
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Healty
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Amount of Backups
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Last backup
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Used Storage
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-row-group">
                                {backupStatuses?.map((backupStatus, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.disk}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.healthy ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <XCircleIcon className="h-5 w-5 text-red-600" />
                                            )}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.amount}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.newest}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.usedStorage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="py-4 mt-4 px-6 bg-white rounded-md border-gray-200 border">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex gap-2">
                            {disks?.map((disk, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        className="mr-2"
                                        value={disk}
                                        checked={checkedDisk === disk}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                    {disk}
                                </label>
                            ))}
                        </div>

                        <div>
                            <PrimaryButton
                                onClick={() => {
                                    getBackupFiles();
                                }}
                            >
                                <ArrowPathIcon className="w-6 h-6"></ArrowPathIcon>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-sm text-left">
                            <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                                <tr>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Path
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Created At
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm">
                                        Size
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm"></th>
                                </tr>
                            </thead>
                            <tbody className="table-row-group">
                                {files?.map((file, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.path}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.date}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.size}
                                        </td>
                                        <td className="border-b text-right table-cell whitespace-nowrap text-gray-500 first:pl-4 last:pr-4 px-3 py-2">
                                            <span className="text-gray-500 flex gap-2">
                                                <Link
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDelete(index);
                                                    }}
                                                    className={`text-red-700 inline-flex py-2 px-2 rounded text-xs border border-red-500`}
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </Link>
                                                <a
                                                    href={route(
                                                        "setting.backup.download",
                                                        {
                                                            path: file.path,
                                                            disk: checkedDisk,
                                                        }
                                                    )}
                                                    className={`text-blue-700 inline-flex py-2 px-2 rounded text-xs border border-sky-500`}
                                                >
                                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}

export default BackupIndex;
