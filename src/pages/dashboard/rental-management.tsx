
import ManageRentalsTable from "@/components/dash-manage-rentals";

export default function ManageRentals() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    Manage Rentals
                </h2>
            </div>
            <ManageRentalsTable />
        </div>
    );
}
