import bannerImage from "@/assets/image/banner/banner.png";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikeApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loading from "./loading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HeroBanner: FC = () => {
    const [isSearchActive, setSearchActive] = useState(false);
    const [search, setSearch] = useState<string>("");
    const { data, isLoading, isSuccess, isError, error } = useGetAllBikesQuery([
        {
            name: "limit",
            value: 3,
        },
        {
            name: "searchTerm",
            value: search,
        },
    ]);
    console.log(data);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";
            toast.error(errorMessage);
        }
    }, [isError, isSuccess, error]);

    const handleSearchClick = () => {
        setSearchActive(true);
    };

    const closeSearch = () => {
        setSearchActive(false);
        setSearch("");
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section
            className={`relative bg-cover bg-right sm:bg-center bg-no-repeat`}
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="absolute inset-0 bg-gray-900/75 sm:bg-gradient-to-r sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25"></div>

            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Ride Through the City
                        <strong className="block font-extrabold text-primary">
                            at Your Own Pace.
                        </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Affordable Bike Rentals for Your Next Urban Adventure
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            to="#"
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                        >
                            Get Started
                        </Link>

                        <button
                            onClick={handleSearchClick}
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary/90 focus:outline-none focus:ring active:text-primary sm:w-auto"
                        >
                            Search Here
                        </button>
                    </div>
                </div>
            </div>

            {isSearchActive && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 bg-opacity-90">
                    <div
                        className="flex w-full max-w-xl px-6 py-2.5 rounded-full bg-background border focus-within:border"
                    >
                        <Input
                            type="search"
                            placeholder="Search anything"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className="bg-transparent on w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                            name="topic"
                        />
                    </div>
                    <button
                        onClick={closeSearch}
                        className="absolute top-8 right-8 bg-gray-900 dark:bg-gray-500 rounded-full text-white text-3xl ps-2 p-2"
                    >
                        <X />
                    </button>
                    {search && data?.data?.length !== 0 && (
                        <div className="mt-4 w-full max-w-xl bg-background rounded-lg p-4">
                            {data?.data?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between border p-2 mb-2 rounded"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-16">
                                            <img
                                                src={item.image || ''}
                                                alt={item.name}
                                                className="rounded"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Brand: {item.brand}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                CC: {item.cc}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Per Hour: ${item.pricePerHour}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button size={"sm"} asChild>
                                            <Link
                                                to={`/bike-details/${item._id}`}
                                            >
                                                Details
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {search && data?.data?.length === 0 && (
                        <div className="mt-4 w-full max-w-xl bg-background rounded-lg p-4 text-center">
                            No results found.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default HeroBanner;
