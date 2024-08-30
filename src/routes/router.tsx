import DashboardLayout from "@/components/layout/dashboard-layout";
import MainLayout from "@/components/layout/main-layout";
import AboutUs from "@/pages/about-us";
import BikeDetails from "@/pages/bike-details";
import ContactUs from "@/pages/contact-us";
import ManageBikes from "@/pages/dashboard/bike-management";
import ManageCoupons from "@/pages/dashboard/coupon-management";
import CreateBike from "@/pages/dashboard/create-bike";
import CreateCoupon from "@/pages/dashboard/create-coupons";
import DashProfile from "@/pages/dashboard/dash-profile";
import ManageUsers from "@/pages/dashboard/user-management";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Bikes from "@/pages/manage-bikes";
import MyRentals from "@/pages/my-rentals";
import NotFound from "@/pages/not-found";
import PaymentPage from "@/pages/payment";
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
            {
                path: "/payment",
                element: <PaymentPage />,
            },
            {
                path: "/my-rentals",
                element: <MyRentals />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                path: 'create-bike',
                element: <CreateBike/>
            },
            {
                path: 'bikes',
                element: <ManageBikes/>
            },
            {
                path: 'users',
                element: <ManageUsers/>
            },
            {
                path: 'profile',
                element: <DashProfile/>
            },
            {
                path: 'coupons',
                element: <ManageCoupons/>
            },
            {
                path: 'create-coupon',
                element: <CreateCoupon/>
            },
        ]
    },
]);

export default router;
