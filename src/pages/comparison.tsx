import { IBike } from "@/Interface/IBike";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikeApi";
import {
    Check,
    DollarSignIcon,
    GaugeIcon,
    Plus,
    WeightIcon,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Comparison() {
    const { data: bikesData } = useGetAllBikesQuery(undefined);
    const [selectedBikes, setSelectedBikes] = useState<IBike[]>([]);

    const bikes = bikesData?.data || [];

    const handleBikeSelect = (bike: IBike) => {
        if (selectedBikes.some((b) => b._id === bike._id)) {
            // If the bike is already selected, deselect it
            setSelectedBikes(selectedBikes.filter((b) => b._id !== bike._id));
        } else if (selectedBikes.length < 4) {
            // If less than 4 bikes are selected, add the new bike
            setSelectedBikes([...selectedBikes, bike]);
        } else {
            // If 4 bikes are selected, remove the first one and add the new one
            setSelectedBikes([...selectedBikes.slice(1), bike]);
        }
    };

    const handleRemoveSelectedBike = (bikeId: string) => {
        setSelectedBikes(selectedBikes.filter((bike) => bike._id !== bikeId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Compare Bikes
            </h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Select up to 4 bikes to compare:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {bikes.map((bike: IBike) => (
                        <div
                            key={bike._id}
                            className="relative flex bg-background rounded-lg border overflow-hidden group"
                        >
                            <div className="">
                                <img
                                    src={bike.image || ""}
                                    alt={bike.name}
                                    className="w-full h-24 object-cover"
                                    style={{
                                        aspectRatio: "400/300",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className="px-2.5">
                                <h3 className="font-semibold line-clamp-1">
                                    {bike.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <GaugeIcon className="size-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {bike.cc}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <WeightIcon className="size-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {bike.year}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSignIcon className="size-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {bike.pricePerHour}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleBikeSelect(bike)}
                                className={`absolute border top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1.5 transition-colors`}
                            >
                                {selectedBikes.some(
                                    (b) => b._id === bike._id
                                ) ? (
                                    <Check size={15} />
                                ) : (
                                    <Plus size={15} />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="text-center text-lg font-medium py-2.5 underline underline-offset-4">
                Comparison Bikes
            </h3>
            {selectedBikes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedBikes.map((bike) => (
                        <div
                            key={bike._id}
                            className="relative border rounded-lg overflow-hidden"
                        >
                            <img
                                src={bike.image || ""}
                                alt={bike.name}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover"
                                style={{
                                    aspectRatio: "200/150",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">
                                    {bike.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                    <div>Price: {bike.pricePerHour}</div>
                                    <div>Top Speed: {bike.cc}</div>
                                    <div>Model: {bike.model}</div>
                                    <div>Year: {bike.year}</div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    handleRemoveSelectedBike(bike._id)
                                }
                                className="absolute border top-2 right-2 bg-white dark:bg-gray-800 rounded-full transition-colors p-0.5"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
