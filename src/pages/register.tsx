import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
}

const Register: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>();

    const [createUser, { isSuccess }] = useSignUpUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Created Successfully");
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        createUser(data);
    };

    const password = watch("password");

    return (
        <div className="flex min-h-[100dvh] flex-col bg-background">
            <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                            Register for Ready Ride
                        </h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Create an account to booking bike
                        </p>
                    </div>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <Label htmlFor="name" className="sr-only">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Full name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email" className="sr-only">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Email address"
                                {...register("email", {
                                    required: "Email is required",
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
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
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
                            <Label
                                htmlFor="confirm-password"
                                className="sr-only"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="phone" className="sr-only">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                type="text"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: "Phone is required",
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="address" className="sr-only">
                                Address
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                autoComplete="address"
                                placeholder="Address"
                                {...register("address", {
                                    required: "Address is required",
                                })}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary hover:text-primary/80"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
