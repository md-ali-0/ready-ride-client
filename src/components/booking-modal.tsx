/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBike } from "@/Interface/IBike";
import { setRentalData } from "@/redux/features/rentals/rentalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BookingModalProps {
    bike: IBike;
    open: boolean;
    onClose: () => void;
}

const BookingModal = ({ bike, open, onClose }: BookingModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            startDate: "",
            startTime: "",
        },
    });
    
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        const startDate = data.startDate;
        const startTime = data.startTime;
        const startTimeAndDate = new Date(
            `${startDate}T${startTime}:00Z`
        ).toISOString();

        const RentalData = {
            bikeId: bike._id,
            startTime: startTimeAndDate,
            amount: 100,
            isBooking: true,
        };
        dispatch(setRentalData(RentalData))
        onClose();
        reset();
        toast.success("Redirecting to Payment Page...",{duration: 1000});
        setTimeout(()=>navigate('/payment'),1000)
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Book Now</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                className="col-span-3"
                                {...register("startDate", {
                                    required: "Date is required",
                                })}
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="startTime" className="text-right">
                                Start Time
                            </Label>
                            <Input
                                id="startTime"
                                type="time"
                                className="col-span-3"
                                {...register("startTime", {
                                    required: "Time is required",
                                })}
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="mx-auto">Pay Now</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
