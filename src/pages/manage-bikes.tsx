import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UserSidebar from "@/components/user-sidebar";
import { useGetAllBikesQuery } from "@/redux/features/bikes/bikeApi";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Brand {
    brand: string;
    country: string;
    foundedYear: number;
    popularModels: string[];
}

const Bikes: FC = () => {
    const [brands, setBrands] = useState<Brand[] | []>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
        undefined
    );
    const [selectedAvailability, setSelectedAvailability] = useState<
        boolean | undefined
    >(undefined);
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [bikesPerPage] = useState(5);

    const { data: allBikes } = useGetAllBikesQuery([
        { name: "searchTerm", value: search },
        { name: "limit", value: bikesPerPage },
        { name: "page", value: currentPage },
        { name: "brand", value: selectedBrand },
        { name: "isAvailable", value: selectedAvailability },
    ]);

    useEffect(() => {
        fetch("brand.json")
            .then((res) => res.json())
            .then((data) => setBrands(data));
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrand(brand);
    };

    const handleAvailabilityChange = (availability: string) => {
        setSelectedAvailability(availability == "available" ? true : false);
    };

    const clearFilters = () => {
        setSelectedBrand(undefined);
        setSelectedAvailability(undefined);
        setSearch(undefined);
    };

    return (
        <div className="container py-12 mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
                <UserSidebar />

                {/* <!-- Main content --> */}
                <div className="flex-1">
                    <div className="border rounded-lg px-2.5 py-5 md:px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-3.5">
                            <h2 className="text-2xl font-semibold">
                                Manage Bikes
                            </h2>
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <div>
                                    <Input
                                        name="search"
                                        id="search"
                                        type="search"
                                        placeholder="Name, Model, etc"
                                        value={search || ""}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <Select
                                    onValueChange={handleAvailabilityChange}
                                    defaultValue={
                                        selectedAvailability ? "" : ""
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="By Availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="available">
                                                Available
                                            </SelectItem>
                                            <SelectItem value="not_available">
                                                Not Available
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select
                                    onValueChange={handleBrandChange}
                                    defaultValue={selectedBrand || ""}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="By Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {brands.map((item, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={item?.brand}
                                                >
                                                    {item?.brand}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant={"outline"}
                                    onClick={clearFilters}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                        <hr className="py-2" />
                        <div className="grid grid-cols-1 gap-4">
                            {allBikes?.data?.map((bike, index) => (
                                <div
                                    key={index}
                                    className="group mx-2 grid grid-cols-12 space-x-5 overflow-hidden rounded-lg border py-8 text-gray-700 dark:text-gray-300 sm:mx-auto"
                                >
                                    <div className="order-2 col-span-1 mt-4 -ml-14 text-left sm:-order-1 sm:ml-4">
                                        <div className="group relative overflow-hidden rounded-lg">
                                            <img
                                                src={bike.image || ''}
                                                alt={bike.name}
                                                className="h-full w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-11 flex flex-col gap-3.5 sm:flex-row pr-8 text-left sm:pl-4">
                                        <div className="flex-1">
                                            <h3 className="text-sm rounded bg-muted text-muted-foreground w-fit px-1 py-0.5">
                                                {bike.brand}
                                            </h3>
                                            <h3 className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
                                                {bike.name}
                                            </h3>
                                            <p className="overflow-hidden pr-7 text-sm">
                                                {bike.description}
                                            </p>
                                            <div className="mt-5 flex flex-wrap flex-col gap-2 text-sm font-medium sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                                <div className="flex gap-2">
                                                    <span className="font-medium">
                                                        Model:
                                                    </span>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {bike.model}
                                                    </Badge>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="font-medium">
                                                        CC:
                                                    </span>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {bike.cc}
                                                    </Badge>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="font-medium">
                                                        Per Hour:
                                                    </span>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {bike.pricePerHour}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                                            {bike.isAvailable ? (
                                                <Badge variant="outline">
                                                    Available
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="whitespace-nowrap"
                                                >
                                                    Not Available
                                                </Badge>
                                            )}

                                            <Button className="w-full">
                                                <Link
                                                    to={`/bike-details/${bike._id}`}
                                                >
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            totalPages={allBikes?.meta?.totalPage as number}
                            currentPage={currentPage as number}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bikes;
