import { IBike } from "@/Interface/IBike";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ShareModal } from "./share-modal";
import { Button } from "./ui/button";

interface BikeCardProps {
    bike: IBike;
}

const BikeCard: FC<BikeCardProps> = ({ bike }) => {
    return (
        <div className="border hover:border-primary transition-all transform duration-500 ease-in-out rounded-xl px-2.5 py-3">
            <div className="h-48">
                <img
                    src={bike.image || ""}
                    alt={bike.name}
                    width={400}
                    height={400}
                    className="rounded-md w-full object-cover"
                />
            </div>
            <div className="space-y-1 py-2.5">
                <h3 className="text-lg font-semibold">{bike.name}</h3>
                <p className="text-sm line-clamp-2 text-muted-foreground">
                    {bike.description}
                </p>
                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">Brand :</span>
                        <span className="text-sm">{bike.brand}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold">CC :</span>
                        <span className="text-sm">{bike.cc}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">Model :</span>
                        <span className="text-sm">{bike.model}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold">Per Hour :</span>
                        <span className="text-sm">${bike.pricePerHour}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button variant={"outline"} size={"sm"} asChild>
                    <Link to={`/bike-details/${bike._id}`}>View Details</Link>
                </Button>

                <ShareModal id={bike._id} />
            </div>
        </div>
    );
};

export default BikeCard;
