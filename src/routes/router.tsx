import MainLayout from "@/components/layout/main-layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    
}]);

export default router;
