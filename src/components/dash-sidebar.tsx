import logo from "@/assets/image/logo/logo-dark.png";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import SideBarMenuItem from "./dash-sidebar-menu-item";
import SidebarSubMenu from "./dash-sidebar-submenu";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-[#0c1427] min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen
                        ? "translate-x-0 ease-out"
                        : "-translate-x-full ease-in"
                }`}
            >
                <div className="flex items-center justify-center border-b border-gray-800 py-[18px]">
                    <Link to="/dashboard">
                        <img src={logo} alt="" className="w-14" />
                    </Link>
                </div>
                <div className="overflow-y-auto custom-scroll">
                    <nav className="mt-5 px-3">
                        <ul>
                            <h4 className="text-gray-400 font-semibold text-xs mb-1">
                                Main
                            </h4>
                            <SideBarMenuItem
                                menu={{
                                    name: "Dashboard",
                                    icon: "LayoutDashboard",
                                    path: "/dashboard",
                                }}
                            />
                            <SidebarSubMenu
                                menu={{
                                    name: "Bikes",
                                    icon: "Bike",
                                }}
                                subMenu={[
                                    {
                                        name: "Create Bike",
                                        path: "/dashboard/create-bike",
                                    },
                                    {
                                        name: "All Bikes",
                                        path: "/dashboard/bikes",
                                    },
                                ]}
                            ></SidebarSubMenu>
                            <SideBarMenuItem
                                menu={{
                                    name: "Rentals",
                                    icon: "ListMinus",
                                    path: "/dashboard/rentals",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Coupons",
                                    icon: "Component",
                                    path: "/dashboard/coupons",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Users",
                                    icon: "Users",
                                    path: "/dashboard/users",
                                }}
                            />
                            <SideBarMenuItem
                                menu={{
                                    name: "Profile",
                                    icon: "UserRoundPen",
                                    path: "/dashboard/profile",
                                }}
                            />
                            {/* <h4 className="text-gray-400 font-semibold text-xs mt-2">
                                Settings
                            </h4> */}
                            <SideBarMenuItem
                                menu={{
                                    name: "Back to Home",
                                    icon: "House",
                                    path: "/",
                                }}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
