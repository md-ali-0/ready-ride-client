import couponImage from "@/assets/image/banner/coupon.png";
import { useState } from "react";
import { Button } from "./ui/button";

const CouponSection = () => {
    const [isCopied, setIsCopied] = useState(false);
    const cuponCopy = () => {
        navigator.clipboard.writeText("Bike2024");
        setIsCopied(true);
        setTimeout(()=>{setIsCopied(false)},1000)
    };

    return (
        <div className="container mx-auto">
            <div className="relative bg-gradient-to-r from-rose-700 from-0% via-red-500 to-pink-500 rounded-xl overflow-hidden sm:h-[390px]">
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center px-5 sm:px-10 py-5">
                    <div className="text-white text-center sm:text-left">
                        <div className="text-xl sm:text-3xl font-medium sm:font-bold mb-4">
                            Special Offer!
                        </div>
                        <div className="text-lg mb-4">
                            Get{" "}
                            <span className="text-yellow-400 font-bold">
                                25% OFF
                            </span>{" "}
                            your first purchase!
                        </div>
                        <div className="text-base mb-4">Use coupon code:</div>
                        <div className="bg-white text-gray-800 rounded-lg px-3 py-1.5 flex items-center justify-between">
                            <span className="text-lg sm:text-2xl font-semibold">
                                Bike2024
                            </span>
                            <Button size={"sm"} onClick={cuponCopy}>
                                {!isCopied ? "Copy" : "Copied !"}
                            </Button>
                        </div>

                        <div className="text-xs sm:text-sm mt-4">
                            <p className="space-x-2">
                                <span>Valid until</span>
                                <span className="font-semibold">
                                    {new Date().toDateString()}
                                </span>
                            </p>
                            <p>Terms and conditions apply.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full sm:w-1/2">
                        <img src={couponImage} className="sm:h-[350px] w-fit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponSection;
