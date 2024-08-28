import * as Icon from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface MenuItem {
    name: string;
    icon: string;
    path: string;
}

interface SideBarMenuItemProps {
    menu: MenuItem;
}

const SideBarMenuItem: FC<SideBarMenuItemProps> = ({ menu }) => {
    const { name, icon, path } = menu;
    const IconComponent = Icon[icon as keyof typeof Icon] as FC<{
        size?: number;
    }>;
    return (
        <li className="py-0.5">
            <NavLink
                to={path}
                className={({ isActive }) =>
                    isActive ? "sideLinkActive" : "sideLink"
                }
            >
                {IconComponent && <IconComponent size={20} />}
                {name}
            </NavLink>
        </li>
    );
};

export default SideBarMenuItem;
