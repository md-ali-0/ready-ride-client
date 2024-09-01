 
import Loading from "@/components/loading";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCretePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import {
    useCreateRentalsMutation,
    useReturnRentalsMutation,
} from "@/redux/features/rentals/rentalApi";
import { removeRentalData } from "@/redux/features/rentals/rentalSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const stripePromise = loadStripe("pk_test_b2Bf9NGOdya0RmEsDsEuZaUF00t1Wd6U5P");

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
    const [name, setName] = useState(userData?.name || "");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentData = {
                amount: rentalData.amount,
                currency: "bdt",
            };

            const { data: secretData } = await cratePaymentIntent(paymentData);

            const card = elements.getElement(CardNumberElement);

            if (!card) {
                return;
            }
            const paymentResult = await stripe.confirmCardPayment(
                secretData?.data,
                {
                    payment_method: {
                        card: card!,
                        billing_details: {
                            name: name,
                            email: userData?.email,
                            phone: userData?.phone,
                            address: {
                                line1: userData?.address,
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
                    dispatch(removeRentalData());
                    if (rentalData.isBooking) {
                        await createRental(rentalData);
                    } else {
                        await returnRental(rentalData);
                        toast.success("Bike Returned Successfully");
                    }
                }
            }
        } catch (error) {
            console.log(error);
            
            toast.error("Payment failed!");
        }
    };

    const handleRedirect = () => {
        navigate("/my-rentals");
    };

    if (isLoading) {
        <Loading />;
    }
    return (
        <div>
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full rounded-lg border p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
                >
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                {" "}
                                Full name (as displayed on card)*{" "}
                            </label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={userData?.name}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="card-number-input"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                {" "}
                                Card number*{" "}
                            </label>
                            <CardNumberElement
                                id="card-number"
                                className="h-10 w-full px-3 py-2 mb-1 border rounded-md"
                                options={{
                                    showIcon: true,
                                    placeholder: "Card Number",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="card-expiration-input"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Card expiration*{" "}
                            </label>
                            <div className="relative">
                                <CardExpiryElement
                                    id="expire-date"
                                    className="h-10 w-full px-3 py-2 mb-1 border rounded-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="cvv-input"
                                className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                CVV*
                                <div
                                    id="cvv-desc"
                                    role="tooltip"
                                    className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                >
                                    The last 3 digits on back of card
                                    <div
                                        className="tooltip-arrow"
                                        data-popper-arrow
                                    ></div>
                                </div>
                            </label>
                            <CardCvcElement
                                id="cvc"
                                className="h-10 w-full px-3 py-2 mb-1 border rounded-md"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant={"gradient"}
                        disabled={!stripe || !elements}
                    >
                        Pay now
                    </Button>
                </form>

                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                    <div className="space-y-4 rounded-lg border p-6">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Price
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    ৳{rentalData.amount || 0}
                                </dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Tax Fee.
                                </dt>
                                <dd className="text-base font-medium text-green-500">
                                    -৳ 00.00
                                    
                                </dd>
                            </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                                Total Price
                            </dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                                ৳{rentalData.amount || 0}
                            </dd>
                        </dl>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-8">
                        <img
                            className="h-8 w-auto dark:hidden"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                            alt=""
                        />
                        <img
                            className="hidden h-8 w-auto dark:flex"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                            alt=""
                        />
                        <img
                            className="h-8 w-auto dark:hidden"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                            alt=""
                        />
                        <img
                            className="hidden h-8 w-auto dark:flex"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <AlertDialog
                open={isPaymentSuccessful}
                onOpenChange={setIsPaymentSuccessful}
            >
                <AlertDialogContent className="max-w-96">
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
            <section className="py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Payment
                        </h2>
                        <PaymentForm />
                    </div>
                </div>
            </section>
        </Elements>
    );
};

export default PaymentPage;
