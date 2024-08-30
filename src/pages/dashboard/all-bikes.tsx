
import ManageBikeTable from "@/components/dash-manage-bikes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ManageBikes() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    Manage Bikes
                </h2>
                <Button asChild>
                    <Link to={"/dashboard/create-bike"}>Add Bike</Link>
                </Button>
            </div>
            <ManageBikeTable />
        </div>
    );
}
