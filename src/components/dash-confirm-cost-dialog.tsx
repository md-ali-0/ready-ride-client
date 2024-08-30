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
import { useCalculateRentalsMutation } from "@/redux/features/rentals/rentalApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

interface ConfirmCostDialogProps {
    id: string | null;
    open: boolean;
    onClose: () => void;
}

const ConfirmCostDialog = ({
    id,
    open,
    onClose,
}: ConfirmCostDialogProps) => {
    const [returnCost, { isSuccess, isError, error }] = useCalculateRentalsMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";
            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Cost Calucated successfully");
        }
    }, [isError, isSuccess, error]);

    const handleConfirmCost = async (id: string) => {
        await returnCost(id);
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Calculate Cost</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to confirm the cost for returning
                        the rental ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleConfirmCost(id as string)}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmCostDialog;
