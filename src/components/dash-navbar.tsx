import { logOut } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

interface DashNavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const DashNavbar: FC<DashNavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();

    const token = useAppSelector((state) => state.auth.token);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: userData, isLoading, refetch } = useGetMeQuery("");

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);

    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
        toast.success("Logout Successfully");
        navigate("/");
    };

    return (
        <div className="flex relative items-center justify-between px-6 py-3 dark:bg-[#0c1427] border dark:border-slate-800">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 focus:outline-none lg:hidden"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="relative mx-4 lg:mx-0">
                    <Search
                        fontSize={20}
                        className="text-gray-400  absolute top-1/2 left-3 -translate-y-1/2"
                    />

                    <Input
                        className="w-64 pl-10 pr-4"
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="relative block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="size-10 rounded-full" />
                                </div>
                            ) : (
                                <Avatar>
                                    <AvatarImage
                                        src={userData?.avatar}
                                        alt={userData?.name}
                                    />
                                    <AvatarFallback>
                                        {userData?.name.split("")[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </button>

                        <div
                            onClick={() => setDropdownOpen(false)}
                            className={`fixed inset-0 z-10 w-full h-full ${
                                dropdownOpen ? "" : "hidden"
                            }`}
                        ></div>

                        <div
                            className={`absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white dark:bg-muted rounded-md shadow-xl ${
                                dropdownOpen ? "" : "hidden"
                            }`}
                        >
                            <Link
                                to="/dashboard/profile"
                                className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                            >
                                Profile
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="block px-4 cursor-pointer py-2 text-sm hover:bg-primary hover:text-white"
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashNavbar;
