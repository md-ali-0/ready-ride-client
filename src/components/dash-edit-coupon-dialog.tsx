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
import { ICoupon } from "@/Interface/ICoupon";
import { useUpdateCouponsMutation } from "@/redux/features/coupon/couponApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface EditCouponDialogProps {
    coupon: ICoupon | null;
    open: boolean;
    onClose: () => void;
}

const EditCouponDialog = ({ coupon, open, onClose }: EditCouponDialogProps) => {
    const form = useForm<ICoupon>({
        defaultValues: coupon || {
            code: "",
            discountValue: 0,
            isActive: true,
            color: "",
            expirationDate: new Date().toISOString().split("T")[0],
        },
    });

    const [updateCoupon, { isSuccess, isError, error }] =
        useUpdateCouponsMutation();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("coupon Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        form.reset(
            coupon || {
                code: "",
                discountValue: 0,
                isActive: true,
                expirationDate: new Date().toISOString().split("T")[0],
            }
        );
    }, [coupon, form, form.reset]);

    const onSubmit = async (data: ICoupon) => {
        const loadingToast = toast.loading("Coupon is Updating...");

        if (coupon) {
            await updateCoupon({ data: data, id: coupon._id });
        }
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[525px]"
            >
                <DialogHeader>
                    <DialogTitle>Edit coupon</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="code">
                                        Coupon Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="code"
                                            placeholder="Enter Coupon Code"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discountValue">
                                        Coupon Discount Value
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="discountValue"
                                            placeholder="Enter Coupon Discount Value"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expirationDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="expirationDate">
                                        Coupon Expiration Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="expirationDate"
                                            type="date"
                                            {...field}
                                            value={
                                                new Date(field.value)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="color">
                                        Coupon Color
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="color"
                                            type="color"
                                            {...field}
                                            value={field.value as string}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="isActive">
                                        Status
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(values) => {
                                                field.onChange(values === "1");
                                            }}
                                            defaultValue={
                                                field.value ? "1" : "0"
                                            }
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"1"}>
                                                    Active
                                                </SelectItem>
                                                <SelectItem value={"0"}>
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="col-span-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCouponDialog;
