import MainLayout from "@/components/layout/main-layout";
import AboutUs from "@/pages/about-us";
import ContactUs from "@/pages/contact-us";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about-us',
            element: <AboutUs/>
        },
        {
            path: '/contact-us',
            element: <ContactUs/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/Register',
            element: <Register/>
        },

    ]
}]);

export default router;
