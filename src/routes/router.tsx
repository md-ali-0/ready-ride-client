import DashboardLayout from "@/components/layout/dashboard-layout";
import MainLayout from "@/components/layout/main-layout";
import AboutUs from "@/pages/about-us";
import BikeDetails from "@/pages/bike-details";
import ContactUs from "@/pages/contact-us";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Bikes from "@/pages/manage-bikes";
import NotFound from "@/pages/not-found";
import Profile from "@/pages/profile";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/manage-bikes",
                element: <Bikes />,
            },
            {
                path: "/bike-details/:id",
                element: <BikeDetails />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
    },
]);

export default router;
