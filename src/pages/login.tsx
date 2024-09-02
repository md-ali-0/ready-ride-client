import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ErrorResponse } from "@/types";
import verifyToken from "@/utils/verify-token";
import { SerializedError } from "@reduxjs/toolkit";
import { Eye, EyeOff } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IUser } from "../Interface/IUser";

interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const [loginUser, { isSuccess, isError, isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("User Logged In Successfully");
            navigate(from);
        }
    }, [error, from, isError, isSuccess, navigate]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
            const res = await loginUser(data).unwrap();
            const user = verifyToken(res?.token) as IUser;
            dispatch(setUser({ user: user, token: res?.token }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-[100dvh] items-center justify-center flex-col bg-background">
            <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                            Welcome back to ReadyRide
                        </h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Sign in to your account to continue
                        </p>
                    </div>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                        <div className="relative">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />

                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5 text-gray-400" />
                                ) : (
                                    <Eye className="size-5 text-gray-400" />
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember-me"
                                    defaultChecked={true}
                                    {...register("rememberMe")}
                                />
                                <Label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-muted-foreground"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    to="#"
                                    className="font-medium text-primary hover:text-primary/80"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Processing ... ' : 'Sign in'}
                            </Button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-primary hover:text-primary/80"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
