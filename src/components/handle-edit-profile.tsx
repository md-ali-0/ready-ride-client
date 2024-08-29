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
import { IUserData } from "@/interface/IUser";
import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "./ui/label";

interface EditProfileDialogProps {
    user: IUserData | null;
    open: boolean;
    onClose: () => void;
}

const EditProfileDialog = ({ user, open, onClose }: EditProfileDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserData>({
        defaultValues: user || {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            role: "user",
        },
    });

    const [updateProfile, { isSuccess, isError, error }] =
        useUpdateProfileMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        } else if (isSuccess) {
            reset();
        }
    }, [isError, isSuccess, error, reset]);

    useEffect(() => {
        reset(
            user || {
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                role: "user",
            }
        );
    }, [user, reset]);

    const onSubmit = async (data: IUserData) => {
        const loadingToast = toast.loading("Profile is Updating...");
        console.log(data);
        
        if (user) {
            await updateProfile(data);
        }
        onClose();
        toast.success("Profile Updated successfully", { id: loadingToast });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[425px]"
            >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4"
                >
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Full name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email address"
                            {...register("email", {
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Password"
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            autoComplete="phone"
                            placeholder="Phone Number"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            autoComplete="address"
                            placeholder="Address"
                            {...register("address")}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="col-span-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDialog;
