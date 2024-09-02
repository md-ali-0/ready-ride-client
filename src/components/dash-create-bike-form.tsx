import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBikeMutation } from "@/redux/features/bikes/bikeApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

type CreateBikeValues = {
    name: string;
    image: File | null;
    description: string;
    pricePerHour: number | string;
    cc: number | string;
    year: number | string;
    model: string;
    brand: string;
    isFeatured: boolean | string;
};

interface Brand {
    brand: string;
    country: string;
    foundedYear: number;
    popularModels: string[];
}

export default function CreateBikeForm() {
    const [brands, setBrands] = useState<Brand[] | []>([]);

    useEffect(() => {
        fetch("/brand.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setBrands(data))
            .catch((error) => console.error("Fetching error:", error));
    }, []);

    const form = useForm<CreateBikeValues>({
        defaultValues: {
            name: "",
            image: null,
            description: "",
            pricePerHour: "",
            cc: "",
            year: "",
            model: "",
            brand: "",
            isFeatured: "0",
        },
    });

    const [createBike, { isSuccess, isError, error }] = useCreateBikeMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Bike Successfully Added");
        }
    }, [isError, isSuccess, error]);

    const onSubmit = async (data: CreateBikeValues) => {
        const creatingToast = toast.loading("Bike Creating ...");
        const bikeData = {
            name: data.name,
            description: data.description,
            pricePerHour: Number(data.pricePerHour),
            cc: Number(data.cc),
            year: Number(data.year),
            model: data.model,
            brand: data.brand,
            isFetured: data.isFeatured,
        };

        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("data", JSON.stringify(bikeData));

        await createBike(formData);
        toast.dismiss(creatingToast)
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Bike Name</FormLabel>
                                <FormControl>
                                    <Input
                                        id="name"
                                        placeholder="Enter Bike name"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
                                        }
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pricePerHour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="pricePerHour">
                                    Price Per Hour
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="pricePerHour"
                                        type="string"
                                        placeholder="Enter Bike Price Per Hour"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="brand">Brand</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(values) =>
                                            field.onChange(values)
                                        }
                                        value={field.value}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((item, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={item?.brand}
                                                >
                                                    {item?.brand}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter Bike description"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="isFeatured">
                                    Featured
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(values) => {
                                            field.onChange(values === "1");
                                        }}
                                        defaultValue="0"
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Featured" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                On
                                            </SelectItem>
                                            <SelectItem value={"0"}>
                                                Off
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="cc">CC</FormLabel>
                                <FormControl>
                                    <Input
                                        id="cc"
                                        type="number"
                                        placeholder="Enter Bike CC"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="year">Year</FormLabel>
                                <FormControl>
                                    <Input
                                        id="year"
                                        type="number"
                                        placeholder="Enter Bike Yar"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="model">Model</FormLabel>
                                <FormControl>
                                    <Input
                                        id="model"
                                        type="text"
                                        placeholder="Enter Bike Model"
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {/* Submit Button */}
                <div className="col-span-2 py-5">
                    <Button type="submit">Create Bike</Button>
                </div>
            </form>
        </Form>
    );
}
