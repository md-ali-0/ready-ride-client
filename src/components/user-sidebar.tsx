import { Bike, LogOut, Shapes, UserRoundPen } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface UserSidebarProps {
    name: string | undefined
}

const UserSidebar: FC<UserSidebarProps> = ({name}) => {

    return (
        <div className="sm:w-64 border rounded-lg">
            <div className="px-6 pt-3.5">
                <h2 className="font-semibold">
                    WELCOME, <br />{" "}
                    <span className="text-lg">{name}</span>
                </h2>
            </div>
            <nav className="mt-2.5">
                <ul className="px-3 space-y-1.5">
                    <li className="border-b rounded-lg hover:bg-primary hover:text-white px-3 py-2">
                        <NavLink to="#" className="flex items-center">
                            <Bike size={20} />
                            <span className="ml-2">Bikes</span>
                        </NavLink>
                    </li>
                    <li className="border-b rounded-lg hover:bg-primary hover:text-white px-3 py-2">
                        <NavLink to="#" className="flex items-center">
                            <Shapes size={20} />
                            <span className="ml-2">My Rentals</span>
                        </NavLink>
                    </li>
                    <li className="border-b rounded-lg hover:bg-primary hover:text-white px-3 py-2">
                        <NavLink to="#" className="flex items-center">
                            <UserRoundPen size={20} />
                            <span className="ml-2">My Profile</span>
                        </NavLink>
                    </li>
                    {/* <!-- Additional items go here --> */}
                    <li className="border-b rounded-lg hover:bg-primary hover:text-white px-3 py-2">
                        <a href="#" className="flex items-center">
                            <LogOut size={20} />
                            <span className="ml-2">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default UserSidebar;
