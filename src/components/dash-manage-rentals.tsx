import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { IRental } from "@/Interface/IRentals";
import {
    useGetRentalsQuery
} from "@/redux/features/rentals/rentalApi";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useState } from "react";
import ConfirmCostDialog from "./dash-confirm-cost-dialog";
import Loading from "./loading";
import { Badge } from "./ui/badge";

const ManageRentalsTable: FC = () => {
    const { data, isLoading } = useGetRentalsQuery(undefined);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRental, setSelectedRental] = useState<string | null>(null);

    const columns: ColumnDef<IRental>[] = [
        {
            accessorKey: "bikeId.image",
            header: "Image",
            cell: ({ row }) => (
                <div className="rounded-md overflow-hidden w-16">
                    <img
                        src={row.original.bikeId.image || ""}
                        alt={row.original.bikeId.name}
                        className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
                    />
                </div>
            ),
        },
        {
            accessorKey: "bikeId.name",
            header: "Bike Name",
        },
        {
            accessorKey: "userId.name",
            header: "User Name",
        },
        {
            accessorKey: "startTime",
            header: "Start Time",
            cell: ({ row }) => (
                <div>
                    {new Date(
                        String(row.original.startTime)
                    ).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            ),
        },
        {
            accessorKey: "returnTime",
            header: "Return Time",
            cell: ({ row }) => (
                <div>
                    {row.original.returnTime ? (
                        new Date(
                            String(row.original.returnTime)
                        ).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    ) : (
                        <span>Not Returned</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "totalCost",
            header: "Total Cost",
        },
        {
            accessorKey: "bookingPayment",
            header: "Payment",
            cell: ({ row }) => (
                <>
                    {row.original.bookingPayment === "paid" ? (
                        <Badge className="capitalize" variant={"default"}>
                            Paid
                        </Badge>
                    ) : (
                        <Badge className="capitalize" variant={"secondary"}>
                            Unpaid
                        </Badge>
                    )}
                </>
            ),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <Button
                    onClick={() => {
                        setSelectedRental(row.original._id);
                        setDialogOpen(true);
                    }}
                >
                    Calculate Cost
                </Button>
            ),
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <DataTable columns={columns} data={data?.data || []} />
            <ConfirmCostDialog
                id={selectedRental}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
};

export default ManageRentalsTable;
