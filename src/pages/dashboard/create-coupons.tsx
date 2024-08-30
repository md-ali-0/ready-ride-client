import Breadcrumb from "@/components/breadcumb";
import CreateCouponForm from "@/components/dash-create-coupon-form";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";

const CreateCoupon: FC = () => {
    return (
        <div className="container mx-auto py-10">
            <Breadcrumb/>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold sm:text-2xl">
                    Create Coupon
                </h2>
                <Button asChild>
                    <Link to={"/dashboard/coupons"}>Manage Coupons</Link>
                </Button>
            </div>
            <CreateCouponForm />
        </div>
    );
};

export default CreateCoupon;
