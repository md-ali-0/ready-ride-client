/* eslint-disable @typescript-eslint/no-explicit-any */
import CouponPaymentDialog from "@/components/coupon-payment-dialog";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserSidebar from "@/components/user-sidebar";
import { IRental } from "@/Interface/IRentals";
import { useGetAllRentalsQuery } from "@/redux/features/rentals/rentalApi";
import { FC, Key, useEffect, useState } from "react";
import { toast } from "sonner";

const MyRentals: FC = () => {
    const [couponDialogOpen, setCouponDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("unpaid");
    const [selectedRental, setSelectedRental] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);

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

    const handlePayment = (rental: any) => {
        setSelectedRental(rental);
        setCouponDialogOpen(true);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container py-12 mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
                <UserSidebar />

                {/* Main content */}
                <div className="flex-1">
                    <div className="border rounded-lg px-2.5 py-5 md:px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-3.5">
                            <h2 className="text-2xl font-semibold">
                                My Rentals
                            </h2>
                        </div>
                        <hr className="py-2" />
                        <div className="flex gap-2">
                            <Button
                                size={"lg"}
                                variant={
                                    activeTab === "unpaid"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setActiveTab("unpaid")}
                            >
                                UnPaid
                            </Button>
                            <Button
                                size={"lg"}
                                variant={
                                    activeTab === "paid" ? "default" : "outline"
                                }
                                onClick={() => setActiveTab("paid")}
                            >
                                Paid
                            </Button>
                        </div>
                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full divide-y">
                                <thead className="bg-zinc-100 dark:bg-zinc-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Start Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Return Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Total Cost
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                            Payment
                                        </th>
                                        {activeTab !== "paid" && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Action
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-background divide-y">
                                    {(allRentals?.data?.length ?? 0) > 0 ? (
                                        allRentals?.data?.map(
                                            (
                                                bike: IRental,
                                                index: Key | null | undefined
                                            ) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {bike?.bikeId
                                                            ?.image && (
                                                            <img
                                                                src={
                                                                    bike?.bikeId
                                                                        ?.image ||
                                                                    ""
                                                                }
                                                                alt={
                                                                    bike?.bikeId
                                                                        ?.name
                                                                }
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                                        {bike?.bikeId?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Badge variant="secondary">
                                                            {new Date(
                                                                String(
                                                                    bike.startTime
                                                                )
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {bike.returnTime ? (
                                                            <Badge variant="secondary">
                                                                {new Date(
                                                                    String(
                                                                        bike.returnTime
                                                                    )
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        weekday:
                                                                            "short",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </Badge>
                                                        ) : (
                                                            <h3 className="text-center">
                                                                Not Returned
                                                            </h3>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <Badge variant="secondary">
                                                            {bike.totalCost}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <Badge variant="secondary">
                                                            {
                                                                bike.bookingPayment
                                                            }
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {activeTab !==
                                                            "paid" && (
                                                            <Button
                                                                onClick={() =>
                                                                    handlePayment(
                                                                        bike
                                                                    )
                                                                }
                                                            >
                                                                Pay Now
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-4 text-center text-sm text-gray-500"
                                            >
                                                No Rentals Available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            totalPages={allRentals?.meta?.totalPage as number}
                            currentPage={currentPage as number}
                            onPageChange={handlePageChange}
                        />
                        <CouponPaymentDialog
                            rental={selectedRental}
                            open={couponDialogOpen}
                            onClose={() => setCouponDialogOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRentals;
