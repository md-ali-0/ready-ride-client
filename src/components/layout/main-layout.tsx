// src/components/layout/main-layout.tsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BackToTop from "../back-to-top";
import Footer from "../footer";
import Navbar from "../navbar";

const MainLayout: React.FC = () => {
    const location = useLocation();
    useEffect(() => {
        // back to top
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <main className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <BackToTop/>
            <Footer />
        </main>
    );
};

export default MainLayout;
