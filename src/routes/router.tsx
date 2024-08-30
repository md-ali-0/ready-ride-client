import DashboardLayout from "@/components/layout/dashboard-layout";
import MainLayout from "@/components/layout/main-layout";
import ProtectedRoute from "@/components/layout/protected-route";
import AboutUs from "@/pages/about-us";
import BikeDetails from "@/pages/bike-details";
import Bikes from "@/pages/bikes";
import Comparison from "@/pages/comparison";
import ContactUs from "@/pages/contact-us";
import ManageBikes from "@/pages/dashboard/bike-management";
import ManageCoupons from "@/pages/dashboard/coupon-management";
import CreateBike from "@/pages/dashboard/create-bike";
import CreateCoupon from "@/pages/dashboard/create-coupons";
import DashProfile from "@/pages/dashboard/dash-profile";
import ManageRentals from "@/pages/dashboard/rental-management";
import ManageUsers from "@/pages/dashboard/user-management";
import Home from "@/pages/home";
import Login from "@/pages/login";
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
                element: <ProtectedRoute role="user"><Profile /></ProtectedRoute>,
            },
            {
                path: "/bikes",
                element: <Bikes />,
            },
            {
                path: "/bike-details/:id",
                element: <BikeDetails />,
            },
            {
                path: "/payment",
                element: <ProtectedRoute role="user"><PaymentPage /></ProtectedRoute>,
            },
            {
                path: "/my-rentals",
                element: <ProtectedRoute role="user"><MyRentals /></ProtectedRoute>,
            },
            {
                path: "/comparison",
                element: <Comparison />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute role="admin">
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "create-bike",
                element: <CreateBike />,
            },
            {
                path: "bikes",
                element: <ManageBikes />,
            },
            {
                path: "users",
                element: <ManageUsers />,
            },
            {
                path: "profile",
                element: <DashProfile />,
            },
            {
                path: "coupons",
                element: <ManageCoupons />,
            },
            {
                path: "create-coupon",
                element: <CreateCoupon />,
            },
            {
                path: "rentals",
                element: <ManageRentals />,
            },
        ],
    },
]);

export default router;
