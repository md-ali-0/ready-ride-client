import { IBike } from "@/Interface/IBike";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikeApi";
import { FC } from "react";
import BikeCard from "./bike-card";

const FeaturedSection: FC = () => {
    const { data: allBikes } = useGetAllBikesQuery([
        {
            name: "limit",
            value: 4,
        },
        {
            name: "isFeatured",
            value: true,
        },
    ]);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Featured Bikes
                    </h2>
                    <p className="text-muted-foreground">
                    Which bike is the best for you?
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {allBikes?.data?.map((bike: IBike) => (
                        <BikeCard key={bike._id} bike={bike} />
                    ))}
                    {/* {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <SkeletonProductCard key={index} />
                          ))
                        : data?.data?.map((bike: IBike) => (
                              <BikeCard
                                  key={bike._id}
                                  bike={bike}
                              />
                          ))} */}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
