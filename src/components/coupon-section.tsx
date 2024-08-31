import couponImage from "@/assets/image/banner/coupon.png";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import SpinWheel from "./spin-wheeler";

const CouponSection = () => {
    const { data: allCoupons } = useGetAllCouponsQuery(undefined);

    return (
        <div className="container mx-auto">
            <div className="relative sm:h-[390px] overflow-hidden bg-primary rounded-2xl">
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center px-5 sm:px-10 py-5 md:px-20">
                    {/* <div className="text-white text-center sm:text-left">
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
                        <div className="bg-red-300 bg-opacity-60 text-gray-800 rounded-lg px-3 py-1.5 flex items-center justify-between">
                            <span className="text-lg sm:text-2xl text-slate-200 font-semibold">
                                Bike25
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
                    </div> */}
                    <SpinWheel coupons={allCoupons?.data || []}/>
                    <div className="flex items-center justify-end w-full sm:w-1/2">
                        <img src={couponImage} className="sm:h-[350px] w-fit" />
                    </div>
                </div>

                <div className="-z-1 absolute bottom-3 left-3 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
                <div className="-z-1 absolute -top-10 left-1/2 h-24 w-24 rounded-full bg-white bg-gradient-to-b from-white to-red-600 opacity-20"></div>
            </div>
        </div>
    );
};

export default CouponSection;
