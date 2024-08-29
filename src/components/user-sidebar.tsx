import { logOut } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { Bike, LogOut, Shapes, UserRoundPen } from "lucide-react";
import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserSidebar: FC = () => {
    const { pathname } = useLocation();
    const { data: userData } = useGetMeQuery([{}]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
        toast.success("Logout Successfully");
        navigate("/");
    };

    return (
        <div className="lg:min-w-64">
            <div className="border rounded-lg py-5">
                <div className="px-6 pt-3.5">
                    <h2 className="font-semibold">
                        WELCOME, <br />{" "}
                        <span className="text-lg">{userData?.name}</span>
                    </h2>
                </div>
                <nav className="mt-2.5">
                    <ul className="px-3 space-y-1.5">
                        <li
                            className={`border-b rounded-lg ${
                                pathname === "/manage-bikes" &&
                                "bg-primary text-white"
                            } hover:bg-primary hover:text-white px-3 py-2`}
                        >
                            <NavLink
                                to="/manage-bikes"
                                className="flex items-center"
                            >
                                <Bike size={20} />
                                <span className="ml-2">Bikes</span>
                            </NavLink>
                        </li>
                        <li
                            className={`border-b rounded-lg ${
                                pathname === "/my-rentals" &&
                                "bg-primary text-white"
                            } hover:bg-primary hover:text-white px-3 py-2`}
                        >
                            <NavLink
                                to="/my-rentals"
                                className="flex items-center"
                            >
                                <Shapes size={20} />
                                <span className="ml-2">My Rentals</span>
                            </NavLink>
                        </li>
                        <li
                            className={`border-b rounded-lg ${
                                pathname === "/profile" &&
                                "bg-primary text-white"
                            } hover:bg-primary hover:text-white px-3 py-2`}
                        >
                            <NavLink
                                to="/profile"
                                className="flex items-center"
                            >
                                <UserRoundPen size={20} />
                                <span className="ml-2">My Profile</span>
                            </NavLink>
                        </li>
                        {/* <!-- Additional items go here --> */}
                        <li className="border-b rounded-lg hover:bg-primary hover:text-white px-3 py-2">
                            <button
                                onClick={handleLogout}
                                className="flex items-center"
                            >
                                <LogOut size={20} />
                                <span className="ml-2">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default UserSidebar;
