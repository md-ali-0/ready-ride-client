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
import { IBike } from "@/Interface/IBike";
import { useDeleteBikeMutation } from "@/redux/features/bikes/bikeApi";

import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

interface DeleteBikeDialogProps {
    bike: IBike | null;
    open: boolean;
    onClose: () => void;
}

const DeleteBikeDialog = ({
    bike,
    open,
    onClose,
}: DeleteBikeDialogProps) => {
    const [deleteBike, { isSuccess, isError, error }] =
        useDeleteBikeMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Category Deleted successfully");
        }
    }, [isError, isSuccess, error]);

    const handleDelete = async (id: string) => {
        await deleteBike(id);
    };
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the Category &quot;
                        {bike?.name}&quot;?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(bike?._id as string)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBikeDialog;
