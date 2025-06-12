import { ColumnDef } from "@tanstack/react-table";
import { Advocate } from "@/app/types";
import { formatPhoneNumber } from "../../../lib/utils";

export const columns: ColumnDef<Advocate>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "specialties",
        header: "Specialties",
        cell: ({ row }) => (
            <div>
                {row.original.specialties.map((s, i) => (
                    <span
                        key={i}
                        className="inline-block mr-1 px-2 py-1 bg-gray-100 rounded"
                    >
                        {s}
                    </span>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "yearsOfExperience",
        header: "Years of Experience",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => (
            <span className="">
                {typeof row.original.phoneNumber === "number"
                    ? formatPhoneNumber(row.original.phoneNumber)
                    : row.original.phoneNumber}
            </span>
        ),
    },
];
