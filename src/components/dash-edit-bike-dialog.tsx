import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IBike } from "@/Interface/IBike";
import { useUpdateBikeMutation } from "@/redux/features/bikes/bikeApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface EditBikeDialogProps {
    bike: IBike | null;
    open: boolean;
    onClose: () => void;
}

interface Brand {
    brand: string;
    country: string;
    foundedYear: number;
    popularModels: string[];
}

const EditBikeDialog = ({ bike, open, onClose }: EditBikeDialogProps) => {
    const [brands, setBrands] = useState<Brand[] | []>([]);
    const [isBrandLoading, setIsBrandLoading] = useState<boolean>(true)

    const form = useForm<IBike>({
        defaultValues: bike || {
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
            setIsBrandLoading(false)
    }, []);

    const [updateBike, { isSuccess, isError, error }] = useUpdateBikeMutation();
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Bike Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    useEffect(() => {
        form.reset(
            bike || {
                name: "",
                image: null,
                description: "",
                pricePerHour: "",
                cc: "",
                year: "",
                model: "",
                brand: "",
                isFeatured: "0",
            }
        );
    }, [bike, form, form.reset]);

    const onSubmit = async (data: IBike) => {
        const loadingToast = toast.loading("Bike is Updating...");

        const bikeData = {
            name: data.name,
            description: data.description,
            pricePerHour: Number(data.pricePerHour),
            cc: Number(data.cc),
            year: Number(data.year),
            model: data.model,
            brand: data.brand,
            isFeatured: data.isFeatured,
        };

        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("data", JSON.stringify(bikeData));
        
        if (bike) {
            await updateBike({ data: formData, id: bike._id });
        }
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[525px]"
            >
                <DialogHeader>
                    <DialogTitle>Edit Bike</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-2 gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        Bike Name
                                    </FormLabel>
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
                                                field.onChange(
                                                    e.target.files?.[0]
                                                )
                                            }
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
                                            value={
                                                field.value
                                                    ? String(field.value)
                                                    : undefined
                                            } 
                                            defaultValue="active"
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={
                                                        isBrandLoading
                                                            ? "Loading.."
                                                            : "Select Brands"
                                                    } />
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
                                            onValueChange={(values) => field.onChange(values === "1")}
                                            defaultValue={
                                                field.value ? "1" : "0"
                                            }
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="col-span-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBikeDialog;
