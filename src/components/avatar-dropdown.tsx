import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    LogOutIcon,
    LucideBadgeInfo,
    LucideClipboardList,
    LucideHeart,
    LucideUser,
    LucideUserRound
} from "lucide-react";
import { FC, useEffect } from "react";

import { Link } from "react-router-dom";

interface AvatarDropdownProps {
    handleLogout: () => void;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ handleLogout }) => {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);

    const { data: userData, isLoading, refetch } = useGetMeQuery("");

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);

    return (
        <div
            className="absolute z-50 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0"
            tabIndex={-1}
        >
            <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                        {isLoading ? (
                            <div className="size-12 rounded-full bg-gray-500"></div>
                        ) : (
                            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-12 h-12 ring-1 ring-white dark:ring-neutral-900">
                                {userData?.avatar ? (
                                    <img
                                        alt={userData?.name}
                                        src={userData?.avatar}
                                        data-nimg="fill"
                                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                                        style={{
                                            position: "absolute",
                                            height: "100%",
                                            width: "100%",
                                            inset: 0,
                                            color: "transparent",
                                        }}
                                    />
                                ) : (
                                    <div className="size-12 flex justify-center items-center rounded-full bg-slate-400">
                                        <LucideUser size={30} />
                                    </div>
                                )}
                            </div>
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
                        >
                            <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                <LucideUser size={20} />
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
                        to={"/account"}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideUserRound size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">My Account</p>
                        </div>
                    </Link>
                    <Link
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        to={"/orders"}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideClipboardList size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">My Order</p>
                        </div>
                    </Link>
                    <Link
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        to={"/wish-list"}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideHeart size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">Wishlist</p>
                        </div>
                    </Link>
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    <Link
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50"
                        to={"/help"}
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <LucideBadgeInfo size={20} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium ">Help</p>
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
