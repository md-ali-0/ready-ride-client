import BookingModal from "@/components/booking-modal";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBike } from "@/Interface/IBike";
import { useGetBikeDetailsQuery } from "@/redux/features/bikes/bikeApi";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const BikeDetails: FC = () => {
    const { id } = useParams();
    const [bookingDialogOpen, setBookingDialogOpen] = useState<boolean>(false);

    const { data, isError, isLoading, isSuccess, error } =
        useGetBikeDetailsQuery(id);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error, data]);
    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start mx-auto py-6">
                <div className="grid gap-4 md:gap-10 items-start">
                    <div className="hidden md:flex items-start rounded-lg">
                        <img
                            src="https://autobike-light.templaza.net/wp-content/uploads/2023/05/kody-goodson-SPBN8LHjaIE-unsplash.jpg"
                            // src={data?.data?.image}
                            alt={data?.data?.name}
                            className="object-fill rounded-lg overflow-hidden h-96 w-auto mx-auto"
                        />
                    </div>
                    <div className="md:hidden">
                        <img
                            src="https://autobike-light.templaza.net/wp-content/uploads/2023/05/kody-goodson-SPBN8LHjaIE-unsplash.jpg"
                            // src={data?.data?.image}
                            alt={data?.data?.name}
                            className="aspect-square object-cover w-full rounded-lg overflow-hidden"
                        />
                    </div>
                </div>
                <div className="grid gap-4 md:gap-5 items-start">
                    <div className="grid gap-4">
                        <h1 className="font-bold text-3xl lg:text-4xl">
                            {data?.data?.name}
                        </h1>
                        <div className="grid gap-4 text-sm leading-loose">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">Model:</div>
                                    <div>{data?.data?.model}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">Brand:</div>
                                    <div>{data?.data?.brand}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">CC:</div>
                                    <div>{data?.data?.cc}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">
                                        Availability:
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="rounded-full px-2 py-1"
                                    >
                                        {data?.data?.isAvailable
                                            ? "Available"
                                            : "Not Available"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="text-lg font-bold space-x-2">
                            <span>Price Per Hour:</span>
                            <span className="text-2xl">
                                ${data?.data?.pricePerHour}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 md:w-1/2">
                            <Button
                                onClick={()=>setBookingDialogOpen(true)}
                                size="lg"
                                className="w-full"
                                disabled={!data?.data?.isAvailable}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-10">
                <ul className="flex border-b">
                    <li className="text-gray-500 rounded-t-md font-semibold text-sm bg-muted hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">
                        Description
                    </li>
                </ul>

                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800">
                        Product Description :
                    </h3>
                    <p className="text-sm text-gray-500 mt-4">
                        {data?.data?.description}
                    </p>
                </div>
            </div>
            <BookingModal open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} bike={data?.data as IBike}/>
        </div>
    );
};

export default BikeDetails;
