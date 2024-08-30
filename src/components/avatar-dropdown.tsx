import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    LogOutIcon,
    LucideAppWindow,
    LucideClipboardList,
    LucideUserRound
} from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface AvatarDropdownProps {
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
    handleLogout: () => void;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ setIsDropdownOpen, handleLogout }) => {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);

    const { data: userData, isLoading, refetch } = useGetMeQuery("");

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);

    return (
        <div className="absolute z-50 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0">
            <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                        {isLoading ? (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="size-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[120px]" />
                                    <Skeleton className="h-4 w-[150px]" />
                                </div>
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

                        <div className="flex-grow">
                            <h4 className="font-semibold">{userData?.name}</h4>
                            <p className="text-xs mt-0.5">
                                {userData?.address}
                            </p>
                        </div>
                    </div>
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    {user?.role == "admin" && (
                        <Link
                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                            to={"/dashboard"}
                            onClick={()=>setIsDropdownOpen(false)}
                        >
                            <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                <LucideAppWindow size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium ">
                                    Dashboard
                                </p>
                            </div>
                        </Link>
                    )}
                    <Link
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        to={"/profile"}
                        onClick={()=>setIsDropdownOpen(false)}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideUserRound size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">My Profile</p>
                        </div>
                    </Link>
                    <Link
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        to={"/my-rentals"}
                        onClick={()=>setIsDropdownOpen(false)}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideClipboardList size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">My Rentals</p>
                        </div>
                    </Link>
                    <div
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        onClick={handleLogout}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LogOutIcon size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">Log out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarDropdown;
