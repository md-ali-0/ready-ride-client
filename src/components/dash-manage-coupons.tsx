import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICoupon } from "@/Interface/ICoupon";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteCouponDialog from "./dash-delete-coupon-dialog";
import EditCouponDialog from "./dash-edit-coupon-dialog";
import Loading from "./loading";
import { Badge } from "./ui/badge";

const ManageCouponTable: FC = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [couponToEdit, setcouponToEdit] = useState<ICoupon | null>(null);
    const [coupontoDelete, setcoupontoDelete] = useState<ICoupon | null>(null);

    const { data, isError, isLoading, isSuccess, error } =
        useGetAllCouponsQuery(undefined);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleEditClick = (coupon: ICoupon) => {
        setcouponToEdit(coupon);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (coupon: ICoupon) => {
        setcoupontoDelete(coupon);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<ICoupon>[] = [
        {
            accessorKey: "code",
            header: "Coupon Code",
        },
        {
            accessorKey: "discountValue",
            header: "Discount Value",
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize">
                        {row.original.isActive ? "On" : "Off"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "color",
            header: "Color",
            cell: ({ row }) => {
                return <div className="p-2 rounded-full" style={{ backgroundColor: row.original.color}}></div>;
            },
        },
        {
            accessorKey: "expirationDate",
            header: "Expiration Date",
            cell: ({ row }) => {
                return (
                    <div className="">
                        {new Date(
                            String(row.original.expirationDate)
                        ).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
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
            <DataTable columns={columns} data={data?.data || []} />
            <EditCouponDialog
                coupon={couponToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <DeleteCouponDialog
                coupon={coupontoDelete}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </>
    );
};

export default ManageCouponTable;
