import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (!data || data.length === 0) {
        return (
            <div
                className={cn(
                    "flex flex-col items-center justify-center py-16 bg-white rounded-md border border-solace-blue shadow",
                    className
                )}
            >
                <svg
                    className="w-12 h-12 text-solace-blue mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
                    <path d="M8 12h8M12 8v8" />
                </svg>
                <span className="text-solace-dark text-lg font-medium">
                    No data found.
                </span>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-md border border-solace-blue shadow bg-white",
                className
            )}
        >
            <table className="min-w-full divide-y divide-solace-blue">
                <thead className="bg-solace-cream">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 text-left font-semibold text-solace-dark border-b border-solace-blue"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={
                                idx % 2 === 0 ? "bg-white" : "bg-solace-cream"
                            }
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-1 py-0.5 text-solace-dark border-b border-solace-blue"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
