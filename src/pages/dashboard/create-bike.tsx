import Breadcrumb from "@/components/breadcumb";
import CreateBikeForm from "@/components/dash-create-bike-form";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";

const CreateBike: FC = () => {
    return (
        <div className="container mx-auto py-10">
            <Breadcrumb/>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                    Create Bike
                </h2>
                <Button asChild>
                    <Link to={"/dashboard/bikes"}>Manage Bikes</Link>
                </Button>
            </div>
            <CreateBikeForm />
        </div>
    );
};

export default CreateBike;
