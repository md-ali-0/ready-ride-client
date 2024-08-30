"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICoupon } from "@/Interface/ICoupon";
import { useCreateCouponsMutation } from "@/redux/features/coupon/couponApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function CreateCouponForm() {
    const form = useForm<ICoupon>({
        defaultValues: {
            code: "",
            discountValue: 0,
            isActive: true,
            expirationDate: new Date().toISOString().split("T")[0],
        },
    });

    const [createCoupon, { isSuccess, isError, error }] =
        useCreateCouponsMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Coupon Successfully Added");
        }
    }, [isError, isSuccess, error]);

    const onSubmit = async (data: ICoupon) => {
        const creatingToast = toast.loading("Coupon Creating ...");
        const couponData = {
            ...data,
            expirationDate: new Date(data.expirationDate).toISOString(),
        };
        await createCoupon(couponData);
        toast.dismiss(creatingToast);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <FormLabel htmlFor="isActive">Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(values) => {
                                            field.onChange(values === "1");
                                        }}
                                        defaultValue="1"
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
                </section>

                {/* Submit Button */}
                <div className="col-span-2 py-5">
                    <Button type="submit">Create Coupon</Button>
                </div>
            </form>
        </Form>
    );
}
