import Dropdown from "@/Components/Dropdown";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthLayout from "@/Layouts/AuthLayout";
import PrimaryButton from "@/MyComponents/Buttons/PrimaryButton";
import Card from "@/MyComponents/Card/Card";
import { Head, Link, router } from "@inertiajs/react";
import {
    Backup,
    Cancel,
    CheckCircleRounded,
    Close,
    Delete,
    Download,
    Menu,
    Refresh,
} from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function BackupIndex({
    auth,
    backupStatuses,
    disks,
    activeDisk,
    files,
    flash,
}) {
    const [checkedDisk, setCheckedDisk] = useState(activeDisk || "");
    const [showMessage, setShowMessage] = useState(false);

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
                })
            );
        }
    };

    const createBackup = (option) => {
        router.post(route("setting.backup.create"), option);
    };

    useEffect(() => {
        setShowMessage(flash.message !== null ? true : false);
    }, [flash]);

    return (
        <>
            <AuthLayout
                auth={auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Backup DB
                    </h2>
                }
            >
                <Head title="Backup DB" />
                {showMessage && (
                    <Alert
                        className="mb-4"
                        action={
                            <IconButton size="small">
                                <Close
                                    onClick={() => {
                                        setShowMessage(false);
                                    }}
                                ></Close>
                            </IconButton>
                        }
                        severity="success"
                    >
                        {flash.message}
                    </Alert>
                )}
                <div className="mb-4 flex gap-2">
                    <PrimaryButton
                        className="gap-2"
                        onClick={(e) => {
                            e.preventDefault();
                            createBackup({ option: "" });
                        }}
                    >
                        <Backup sx={{ fontSize: "medium" }}></Backup>
                        <span>Buat Backup</span>
                    </PrimaryButton>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <SecondaryButton>
                                <Menu sx={{ fontSize: "medium" }}></Menu>
                            </SecondaryButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="left">
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
                </div>
                <Card>
                    <div className="mb-4 flex justify-end">
                        <PrimaryButton
                            onClick={(e) => {
                                router.visit(route("setting.backup.index"));
                            }}
                        >
                            <Refresh sx={{ fontSize: "medium" }}></Refresh>
                        </PrimaryButton>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-sm text-left">
                            <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                                <tr>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Disk
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Healty
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Amount of Backups
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Last backup
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
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
                                                <CheckCircleRounded
                                                    sx={{ color: "green" }}
                                                />
                                            ) : (
                                                <Cancel sx={{ color: "red" }} />
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
                                <Refresh sx={{ fontSize: "medium" }}></Refresh>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-sm text-left">
                            <thead className="bg-slate-100 table-header-group text-gray-600 border boder-gray-400">
                                <tr>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Path
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Created At
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase">
                                        Size
                                    </th>
                                    <th className="py-3 px-4 table-cell font-semibold text-xs uppercase"></th>
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
                                                    <Delete
                                                        sx={{
                                                            fontSize: "medium",
                                                        }}
                                                    />
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
                                                    <Download
                                                        sx={{
                                                            fontSize: "medium",
                                                        }}
                                                    />
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
