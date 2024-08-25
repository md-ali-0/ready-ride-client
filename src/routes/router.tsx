import MainLayout from "@/components/layout/main-layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
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
            path: '/login',
            element: <Login/>
        },
        // {
        //     path: '/Register',
        //     element: <Register/>
        // },

    ]
}]);

export default router;
