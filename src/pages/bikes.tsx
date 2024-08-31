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
    const [bikesPerPage] = useState(8);

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
            <div className="border rounded-lg px-2.5 py-5 md:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-3.5">
                    <h2 className="text-2xl font-semibold">All Bikes</h2>
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
                            defaultValue={selectedAvailability ? "" : ""}
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
                        <Button variant={"outline"} onClick={clearFilters}>
                            Clear
                        </Button>
                    </div>
                </div>
                <hr className="py-2" />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allBikes?.data?.map((bike, index) => (
                        <div
                            className="border hover:border-primary transition-all transform duration-500 ease-in-out rounded-xl px-2.5 py-3"
                            key={index}
                        >
                            <div className="h-48 overflow-hidden rounded-md">
                                <img
                                    src={bike.image || ""}
                                    alt={bike.name}
                                    width={400}
                                    height={400}
                                    className="rounded-md h-48 hover:scale-105 transform transition-all duration-300 animate-in ease-in-out w-full object-cover"
                                />
                            </div>
                            <div className="space-y-1 py-2.5">
                                <h3 className="text-lg font-semibold">
                                    {bike.name}
                                </h3>
                                <p className="text-sm line-clamp-2 text-muted-foreground">
                                    {bike.description}
                                </p>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold">
                                            Brand :
                                        </span>
                                        <span className="text-sm">
                                            {bike.brand}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm font-bold">
                                            CC :
                                        </span>
                                        <span className="text-sm">
                                            {bike.cc}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold">
                                            Model :
                                        </span>
                                        <span className="text-sm">
                                            {bike.model}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm font-bold">
                                            Per Hour :
                                        </span>
                                        <span className="text-sm">
                                            ${bike.pricePerHour}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                {bike.isAvailable ? (
                                    <Badge variant="outline">Available</Badge>
                                ) : (
                                    <Badge
                                        variant="outline"
                                        className="whitespace-nowrap"
                                    >
                                        Not Available
                                    </Badge>
                                )}
                                <Button variant={"outline"} size={"sm"} asChild>
                                    <Link to={`/bike-details/${bike._id}`}>
                                        View Details
                                    </Link>
                                </Button>
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
    );
};

export default Bikes;
