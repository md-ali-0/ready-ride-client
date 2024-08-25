import MainLayout from "@/components/layout/main-layout";
import Home from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },

    ]
}]);

export default router;
