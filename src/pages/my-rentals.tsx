/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSidebar from "@/components/user-sidebar";
import { useGetAllRentalsQuery } from "@/redux/features/rentals/rentalApi";
import { setRentalData } from "@/redux/features/rentals/rentalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FC, Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyRentals: FC = () => {
    const [activeTab, setActiveTab] = useState<string>("unpaid");
    const [selectedRental, setSelectedRental] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);

    const navigate = useNavigate();

    const {
        data: allRentals,
        isError,
        isLoading,
        isSuccess,
        error,
    } = useGetAllRentalsQuery([
        {
            name: "bookingPayment",
            value: activeTab,
        },
    ]);

    useEffect(() => {
        if (isError) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const dispatch = useAppDispatch()

    const handlePayment = (rental: any) => {
        setSelectedRental(rental);
        const RentalData = {
            amount: 100,
            isBooking: false,
        };
        dispatch(setRentalData(RentalData))
        toast.success("Redirecting to Payment Page...",{duration: 1000});
        setTimeout(()=>navigate('/payment'),1000)
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container py-12 mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
                <UserSidebar />

                {/* <!-- Main content --> */}
                <div className="flex-1">
                    <div className="border rounded-lg px-2.5 py-5 md:px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-3.5">
                            <h2 className="text-2xl font-semibold">
                                My Rentals
                            </h2>
                        </div>
                        <hr className="py-2" />
                        <Tabs defaultValue="unpaid" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger
                                    value="unpaid"
                                    onClick={() => setActiveTab("unpaid")}
                                >
                                    Unpaid
                                </TabsTrigger>
                                <TabsTrigger
                                    value="paid"
                                    onClick={() => setActiveTab("paid")}
                                >
                                    Paid
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="grid grid-cols-1 gap-4 pt-5">
                            {allRentals?.data.length > 0 ? (
                                allRentals?.data?.map(
                                    (
                                        bike: any,
                                        index: Key | null | undefined
                                    ) => (
                                        <div
                                            key={index}
                                            className="group mx-2 grid grid-cols-12 space-x-5 overflow-hidden rounded-lg border py-8 text-gray-700 dark:text-gray-300 sm:mx-auto"
                                        >
                                            <div className="order-2 col-span-1 mt-4 -ml-14 text-left sm:-order-1 sm:ml-4">
                                                <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                                                    <img
                                                        src={
                                                            "https://autobike-light.templaza.net/wp-content/uploads/2023/05/kody-goodson-SPBN8LHjaIE-unsplash.jpg"
                                                        }
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-11 flex flex-col gap-3.5 sm:flex-row pr-8 text-left sm:pl-4">
                                                <div className="flex-1">
                                                    <h3 className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
                                                        {bike?.bikeId?.name}
                                                    </h3>
                                                    <div className="mt-5 flex flex-wrap flex-col gap-2 text-sm font-medium sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                                        <div className="flex gap-2">
                                                            <span className="font-medium">
                                                                Start Time:
                                                            </span>
                                                            <Badge
                                                                variant={
                                                                    "secondary"
                                                                }
                                                            >
                                                                {new Date(
                                                                    bike.startTime
                                                                ).toLocaleDateString()}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className="font-medium">
                                                                Total Cost:
                                                            </span>
                                                            <Badge
                                                                variant={
                                                                    "secondary"
                                                                }
                                                            >
                                                                {bike.totalCost}
                                                            </Badge>
                                                        </div>
                                                        {activeTab ===
                                                            "paid" && (
                                                            <div className="flex gap-2">
                                                                <span className="font-medium">
                                                                    Return Time:
                                                                </span>
                                                                <Badge
                                                                    variant={
                                                                        "secondary"
                                                                    }
                                                                >
                                                                    {new Date(
                                                                        bike.returnTime
                                                                    ).toLocaleDateString()}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {activeTab !== "paid" && (
                                                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                                                        <Button onClick={() => handlePayment(bike)} className="w-full">
                                                            Pay Now
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="flex justify-center items-center py-20">
                                    <h3>No Rentals Available</h3>
                                </div>
                            )}
                        </div>
                        <Pagination
                            totalPages={allRentals?.meta?.totalPage as number}
                            currentPage={currentPage as number}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRentals;
