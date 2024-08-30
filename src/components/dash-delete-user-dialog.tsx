import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IUserData } from "@/interface/IUser";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";

import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

interface DeleteUserDialogProps {
    user: IUserData | null;
    open: boolean;
    onClose: () => void;
}

const DeleteUserDialog = ({
    user,
    open,
    onClose,
}: DeleteUserDialogProps) => {
    const [deleteUser, { isSuccess, isError, error }] =
        useDeleteUserMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("User Deleted successfully");
        }
    }, [isError, isSuccess, error]);

    const handleDelete = async (id: string) => {
        await deleteUser(id);
    };
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the User &quot;
                        {user?.name}&quot;?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(user?._id as string)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUserDialog;
