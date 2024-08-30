
import ManageCouponTable from "@/components/dash-manage-coupons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ManageCoupons() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    Manage Coupons
                </h2>
                <Button asChild>
                    <Link to={"/dashboard/create-coupon"}>Create Coupon</Link>
                </Button>
            </div>
            <ManageCouponTable />
        </div>
    );
}
