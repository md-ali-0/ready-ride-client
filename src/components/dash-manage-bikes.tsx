import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBike } from "@/Interface/IBike";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikeApi";
import { TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteBikeDialog from "./dash-delete-bike-dialog";
import EditBikeDialog from "./dash-edit-bike-dialog";
import Loading from "./loading";
import { Badge } from "./ui/badge";

const ManageBikeTable: FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bikeToEdit, setbikeToEdit] = useState<IBike | null>(null);
    const [biketoDelete, setbiketoDelete] = useState<IBike | null>(null);

    const { data, isError, isLoading, isSuccess, error } =
        useGetAllBikesQuery([
        {
            name: "limit",
            value: limit,
        },
        {
            name: "page",
            value: page,
        },
    ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleEditClick = (bike: IBike) => {
        setbikeToEdit(bike);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (bike: IBike) => {
        setbiketoDelete(bike);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<IBike>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className="rounded-md overflow-hidden w-16">
                        <img
                            src={row.original.image || ""}
                            alt={row.original.name}
                            className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "brand",
            header: "Brand",
        },
        {
            accessorKey: "model",
            header: "Model",
        },
        {
            accessorKey: "year",
            header: "Year",
        },
        {
            accessorKey: "cc",
            header: "CC",
        },
        {
            accessorKey: "isFeatured",
            header: "Featured",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize">
                        {row.original.isFeatured ? "On" : "Off"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "pricePerHour",
            header: "Price/Hour",
        },
        {
            accessorKey: "isAvailable",
            header: "Availability",
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.isAvailable ? (
                            <Badge className="capitalize" variant={"outline"}>
                                Yes
                            </Badge>
                        ) : (
                            <Badge className="capitalize" variant={"outline"}>
                                No
                            </Badge>
                        )}
                    </>
                );
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <LucideMoreVertical size={20} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => handleEditClick(row.original)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(row.original)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data || []}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
                meta={data?.meta as TMeta}
            />
            <EditBikeDialog
                bike={bikeToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <DeleteBikeDialog
                bike={biketoDelete}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </>
    );
};

export default ManageBikeTable;
