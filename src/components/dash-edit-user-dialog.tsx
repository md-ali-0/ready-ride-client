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
import { IUserData } from "@/Interface/IUserData";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
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

interface EditUserDialogProps {
    user: IUserData | null;
    open: boolean;
    onClose: () => void;
}

const EditUserDialog = ({ user, open, onClose }: EditUserDialogProps) => {
    const form = useForm<IUserData>({
        defaultValues: user || {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            role: "user",
        },
    });

    const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("User Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        form.reset(
            user || {
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                role: "user",
            }
        );
    }, [user, form, form.reset]);

    const onSubmit = async (data: IUserData) => {
        const loadingToast = toast.loading("User is Updating...");
        if (user) {
            await updateUser({ data: data, id: user._id });
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
                    <DialogTitle>Edit Bike</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        User Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Enter User name"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter User Email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter User password"
                                            {...field}
                                            
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="role">
                                        User Role
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(values) =>
                                                field.onChange(values)
                                            }
                                            value={field.value}
                                            defaultValue=""
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={"Select Role"}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"admin"}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={"user"}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="phone">
                                        Phone
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="phone"
                                            type="text"
                                            placeholder="Enter User phone"
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
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="address">
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder="Enter User address"
                                            {...field}
                                            required
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
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
