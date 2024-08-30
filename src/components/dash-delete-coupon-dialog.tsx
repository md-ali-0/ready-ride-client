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
import { ICoupon } from "@/Interface/ICoupon";
import { useDeletecouponsMutation } from "@/redux/features/coupon/couponApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";

interface DeleteCouponDialogProps {
    coupon: ICoupon | null;
    open: boolean;
    onClose: () => void;
}

const DeleteCouponDialog = ({
    coupon,
    open,
    onClose,
}: DeleteCouponDialogProps) => {
    const [deleteCoupon, { isSuccess, isError, error }] =
        useDeletecouponsMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Coupon Deleted successfully");
        }
    }, [isError, isSuccess, error]);

    const handleDelete = async (id: string) => {
        await deleteCoupon(id);
    };
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the Coupon &quot;
                        {coupon?.code}&quot;?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(coupon?._id as string)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCouponDialog;
