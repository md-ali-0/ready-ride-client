// src/components/layout/main-layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    );
};

export default MainLayout;
