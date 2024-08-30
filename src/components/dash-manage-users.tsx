import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

import { IUserData } from "@/Interface/IUserData";
import DeleteUserDialog from "./dash-delete-user-dialog";
import EditUserDialog from "./dash-edit-user-dialog";
import Loading from "./loading";
import { Badge } from "./ui/badge";

const ManageUsersTable: FC = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToEdit, setuserToEdit] = useState<IUserData | null>(null);
    const [usertoDelete, setusertoDelete] = useState<IUserData | null>(null);

    const { data: users, isError, isLoading, isSuccess, error } = useGetAllUsersQuery(undefined);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handleEditClick = (user: IUserData) => {
        setuserToEdit(user);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (user: IUserData) => {
        setusertoDelete(user);
        setDeleteDialogOpen(true);
    };

    const columns: ColumnDef<IUserData>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                return (
                    <Badge className="capitalize" variant={'outline'}>
                        {row.original.role}
                    </Badge>
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
            <DataTable columns={columns} data={users || []} />
            <EditUserDialog
                user={userToEdit}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
            <DeleteUserDialog
                user={usertoDelete}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </>
    );
};

export default ManageUsersTable;
