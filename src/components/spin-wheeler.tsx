import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ICoupon } from "@/Interface/ICoupon";

import { setcouponData } from "@/redux/features/coupon/couponSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FC, useState } from "react";
import { Button } from "./ui/button";

interface SpinWheelProps{
    coupons: ICoupon[]
}

const SpinWheel : FC<SpinWheelProps> = ({coupons}) => {
    const [degree, setDegree] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isCopied, setIsCopied] = useState(false);
    const dispatch = useAppDispatch();

    const sliceAngle = 360 / coupons.length;

    const handleSpin = () => {
        const randomDegree = Math.floor(Math.random() * 3600) + 360;
        setDegree(degree + randomDegree);

        const selectedIndex = Math.floor(
            ((degree + randomDegree) % 360) / sliceAngle
        );
        setSelectedCoupon(coupons[selectedIndex]);

        setTimeout(() => setIsDialogOpen(true), 3000);
    };

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 300);

        navigator.clipboard.writeText(selectedCoupon?.code as string);

        const cuponCode = {
            code: selectedCoupon?.code || "",
            color: selectedCoupon?.color || "",
            discountValue: selectedCoupon?.discountValue || 25,
            isActive: selectedCoupon?.isActive || true,
            expirationDate: selectedCoupon?.expirationDate || null,
        };
        dispatch(setcouponData(cuponCode));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 rounded-full border-8 overflow-hidden">
                <div
                    id="wheel"
                    className="relative w-full h-full"
                    style={{
                        transform: `rotate(${degree}deg)`,
                        transition:
                            "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                >
                    {coupons?.map((slice, index) => (
                        <div
                            key={index}
                            className={`absolute w-1/2 h-full`}
                            style={{
                                clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                                transform: `rotate(${index * sliceAngle}deg)`,
                                transformOrigin: "100% 50%",
                                backgroundColor: `${slice.color}`,
                            }}
                        >
                            <div
                                className="absolute inset-0 flex justify-center items-center"
                                style={{
                                    transform: `rotate(${sliceAngle / 2}deg)`,
                                }}
                            >
                                <span
                                    className="text-white font-bold"
                                    style={{
                                        transform: `rotate(-${
                                            sliceAngle / 2
                                        }deg)`,
                                    }}
                                >
                                    {slice.code}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Button onClick={handleSpin} variant={"outline"} className="mt-8">
                Spin
            </Button>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-w-96">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                        <AlertDialogDescription>
                            You won a {selectedCoupon?.code} discount! Click to
                            copy the coupon code.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleCopy}>
                            {!isCopied ? "Copy" : "Copied !"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SpinWheel;
