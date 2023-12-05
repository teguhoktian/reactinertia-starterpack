import Dropdown from "@/Components/Dropdown";
import SecondaryButton from "@/MyComponents/Buttons/SecondaryButton";
import AuthLayout from "@/Layouts/AuthLayout";
import AlertSuccess from "@/MyComponents/Alert/AlertSuccess";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import Card from "@/MyComponents/Card/Card";
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    TrashIcon,
    XCircleIcon,
    InboxStackIcon,
    Bars3Icon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

function BackupIndex({
    auth,
    backupStatuses,
    disks,
    activeDisk,
    files,
    flash,
    settings,
}) {
    const [checkedDisk, setCheckedDisk] = useState(activeDisk || "");
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        setCheckedDisk(value);
        router.get(route("setting.backup.index", { disk: value }));
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
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-base text-gray-800 leading-tight">
                        Backup DB
                    </h2>
                }
            >
                <Head title={`Backup DB - ${settings.sitename}`} />
                {showMessage && (
                    <AlertSuccess delay="5000" show={showMessage}>
                        {flash.message}
                    </AlertSuccess>
                )}
                <div className="mb-4 flex gap-2"></div>
                <Card>
                    <div className="mb-4 flex justify-end gap-2">
                        <PrimaryButton
                            disabled={loading}
                            className="lg:pl-2 gap-1"
                            onClick={(e) => {
                                e.preventDefault();
                                createBackup({ option: "" });
                            }}
                        >
                            <InboxStackIcon className="h-4 w-4"></InboxStackIcon>
                            <span>Buat Backup</span>
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
                                router.visit(route("setting.backup.index"));
                            }}
                        >
                            <ArrowPathIcon className="w-6 h-6"></ArrowPathIcon>
                        </PrimaryButton>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-sm text-left">
                            <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                                <tr>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Disk
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Healty
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Amount of Backups
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Last backup
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Used Storage
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-row-group">
                                {backupStatuses?.map((backupStatus, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.disk}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.healthy ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <XCircleIcon className="h-5 w-5 text-red-600" />
                                            )}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.amount}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.newest}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {backupStatus.usedStorage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card className="mt-4">
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
                                    handleChange(checkedDisk);
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
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Path
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Created At
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase">
                                        Size
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-sm uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="table-row-group">
                                {files?.map((file, index) => (
                                    <tr key={index}>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.path}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.date}
                                        </td>
                                        <td className="border-b text-left table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
                                            {file.size}
                                        </td>
                                        <td className="border-b text-right table-cell whitespace-nowrap text-slate-800 first:pl-4 last:pr-4 px-3 py-2">
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
                </Card>
            </AuthLayout>
        </>
    );
}

export default BackupIndex;
