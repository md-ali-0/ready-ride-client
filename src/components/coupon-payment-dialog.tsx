/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IRental } from "@/Interface/IRentals";
import { useVerifyCouponMutation } from "@/redux/features/coupon/couponApi";
import { setRentalData } from "@/redux/features/rentals/rentalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";

interface CouponPaymentDialogProps {
    rental: IRental | null;
    open: boolean;
    onClose: () => void;
}

const CouponPaymentDialog = ({ rental, open, onClose }: CouponPaymentDialogProps) => {
    const couponData = useAppSelector((state)=>state.coupon)
    const initialDiscountCost = couponData?.discountValue 
    ? Math.max((rental?.totalCost || 0) - couponData.discountValue, 0)
    : rental?.totalCost || 0;
    const [discountCost, setDiscountCost] = useState<number>(initialDiscountCost);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [verifyCoupon] = useVerifyCouponMutation();
    const form = useForm();

    const onSubmit = async (data: any) => {
        const loadingToast = toast.loading("Processing...");

        try {
            // Verify the coupon code
            const {data: couponDetails} = await verifyCoupon(data.couponCode).unwrap();
            console.log(couponDetails);
            
            // Check if the coupon is active and not expired
            if (couponDetails.isActive && new Date(couponDetails.expirationDate) >= new Date()) {
                const calculatedDiscount = rental?.totalCost as number - couponDetails.discountValue;
                setDiscountCost(Math.max(calculatedDiscount, 0));

                // Set rental data with the discounted cost
                const rentalData = {
                    bikeId: rental?._id,
                    amount: Math.max(calculatedDiscount, 0),
                    isBooking: false,
                };
                dispatch(setRentalData(rentalData));

                toast.success("Coupon applied! Redirecting to Payment Page...", { duration: 1000 });
                setTimeout(() => navigate("/payment"), 1000);
                toast.dismiss(loadingToast);
                onClose();
            } else {
                // Notify if the coupon is not active or expired
                toast.error("The coupon is either inactive or has expired.");
                toast.dismiss(loadingToast);
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid coupon code.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[525px]"
            >
                <DialogHeader>
                    <DialogTitle>Payment with Coupon</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div>
                            <h3 className="text-lg font-medium">Your Total Cost: {rental?.totalCost}</h3>
                            <h3 className="text-lg font-medium">Your Discounted Cost: {discountCost}</h3>
                        </div>
                        <FormField
                            control={form.control}
                            name="couponCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="couponCode">
                                        Your Coupon Code:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="couponCode"
                                            placeholder="Enter Coupon Code"
                                            {...field}
                                            required
                                            defaultValue={couponData?.code || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="col-span-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Proceed to Payment</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CouponPaymentDialog;
