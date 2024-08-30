/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/components/loading";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCretePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { useCreateRentalsMutation, useReturnRentalsMutation } from "@/redux/features/rentals/rentalApi";
import { removeRentalData } from "@/redux/features/rentals/rentalSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const stripePromise = loadStripe("pk_test_b2Bf9NGOdya0RmEsDsEuZaUF00t1Wd6U5P");

interface PaymentFormInputs {
    firstName: string;
    phone: string;
    email: string;
    address: string;
}

const PaymentForm: FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [createRental, { isError }] = useCreateRentalsMutation();
    const [returnRental] = useReturnRentalsMutation();
    const [cratePaymentIntent, { isError: paymentIntentCreateError }] =
        useCretePaymentIntentMutation();
    const rentalData = useAppSelector((state) => state.rental);
    const { data: userData, isLoading } = useGetMeQuery(undefined);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormInputs>({
        defaultValues: userData,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError]);

    useEffect(() => {
        if (paymentIntentCreateError) {
            toast.error("Something Went Wrong");
        }
    }, [paymentIntentCreateError]);

    const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentData = {
                amount: rentalData.amount,
                currency: "bdt",
            };

            const { data: secretData } = await cratePaymentIntent(paymentData);

            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(
                secretData?.data,
                {
                    payment_method: {
                        card: cardElement!,
                        billing_details: {
                            name: data.firstName,
                            email: data.email,
                            phone: data.phone,
                            address: {
                                line1: data.address,
                            },
                        },
                    },
                }
            );

            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent?.status === "succeeded") {
                    setIsPaymentSuccessful(true);
                    dispatch(removeRentalData())
                    if (rentalData.isBooking) {
                        await createRental(rentalData);
                    } else {
                        await returnRental(rentalData);
                        toast.success("Bike Returned Successfully")
                    }
                }
            }
        } catch (error) {
            toast.error("Payment failed!");
        }
    };

    const handleRedirect = () => {
        navigate('/my-rentals');
    };

    if (isLoading) {
        <Loading />;
    }
    return (
        <div>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="First name"
                            defaultValue={userData?.name}
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder="Phone number"
                            defaultValue={userData?.phone}
                            {...register("phone", {
                                required: "Phone number is required",
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email Address"
                            defaultValue={userData?.email}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Street address"
                            defaultValue={userData?.address}
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
                </div>
                <div>
                    <h3 className="text-xl sm:text-2xl font-medium">
                        Total Cost:{" "}
                        <span className="text-green-600">{rentalData.amount || 0} Taka</span>
                    </h3>
                </div>
                <CardElement className="border p-2 rounded" />
                <div className="flex flex-wrap justify-end gap-4 mt-12">
                    <Button
                        type="submit"
                        variant={"gradient"}
                        size={"lg"}
                        disabled={!stripe || !elements}
                    >
                        Pay now
                    </Button>
                </div>
            </form>
            <AlertDialog
                open={isPaymentSuccessful}
                onOpenChange={setIsPaymentSuccessful}
            >
                <AlertDialogTrigger asChild>
                    <Button className="hidden">Trigger</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogDescription>
                        Payment was successful! You will be redirected to your
                        rentals page.
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={handleRedirect}>
                        Ok
                    </AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

const PaymentPage: FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Payment
                        </h2>
                        <p className="text-muted-foreground">
                            Make a Secure Payment
                        </p>
                    </div>
                    <div className="mt-12">
                        <PaymentForm />
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default PaymentPage;
