import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashNavbar from "../dash-navbar";
import Sidebar from "../dash-sidebar";

const DashboardLayout: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const location = useLocation();
    useEffect(() => {
        // back to top
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className="flex h-screen">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashNavbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto dash-content-scroll">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 py-2">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
