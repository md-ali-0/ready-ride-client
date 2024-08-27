import { IBike } from "@/Interface/IBike";
import { FC } from "react";
import { ShareModal } from "./share-modal";
import { Button } from "./ui/button";

interface BikeCardProps {
    bike: IBike;
}

const BikeCard: FC<BikeCardProps> = ({ bike }) => {
    return (
        <div className="border rounded-xl px-2.5 py-3">
            <img
                src={
                    "https://autobike-light.templaza.net/wp-content/uploads/2023/05/kody-goodson-SPBN8LHjaIE-unsplash.jpg"
                }
                alt={bike.name}
                className="rounded-md object-cover"
            />
            <div className="space-y-1 py-2.5">
                <h3 className="text-lg font-semibold">{bike.name}</h3>
                <p className="text-sm text-muted-foreground">{bike.description}</p>
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
                <Button variant={"outline"} size={"sm"}>
                    View Details
                </Button>

                <ShareModal id={bike._id}/>
            </div>
        </div>
    );
};

export default BikeCard;
