import { logOut, selectCurrentToken } from "@/redux/features/auth/authSlice";
import verifyToken from "@/utils/verify-token";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(selectCurrentToken);
    const location = useLocation();

    let user;

    if (token) {
        user = verifyToken(token);
    }

    const dispatch = useAppDispatch();

    if (role !== undefined && role !== user?.role) {
        dispatch(logOut());
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
    if (!token) {
        return (
            <Navigate to="/login" state={{ from: location }} replace={true} />
        );
    }

    return children;
};

export default ProtectedRoute;
