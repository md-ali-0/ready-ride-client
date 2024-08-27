import logoDark from "@/assets/image/logo/logo-dark.png";
import logo from "@/assets/image/logo/logo.svg";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LucideMenu, User2, X } from "lucide-react";
import { FC, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AvatarDropdown from "./avatar-dropdown";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

const Navbar: FC = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const token = useAppSelector((state) => state.auth.token);
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
        toast.success("Logout Successfully");
        navigate("/");
    };

    return (
        <header className="flex border-b py-4 px-4 sm:px-10  tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between gap-5 w-full">
                <Link
                    to={"/"}
                    onClick={() => {
                        setIsOpen(false);
                        setIsDropdownOpen(false);
                    }}
                >
                    {theme == "dark" || theme == "system" ? (
                        <img src={logoDark} alt="logo" className="w-24" />
                    ) : (
                        <img src={logo} alt="logo" className="w-24" />
                    )}
                </Link>
                <div
                    style={{ display: `${isOpen ? "flex" : "none"}` }}
                    className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-background p-1.5"
                    >
                        <X size={25} />
                    </button>
                    <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-background max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="mb-6 hidden max-lg:block">
                            <Link
                                to={"/"}
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {theme == "dark" ? (
                                    <img
                                        src={logoDark}
                                        alt="logo"
                                        className="w-32"
                                    />
                                ) : (
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="w-32"
                                    />
                                )}
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:py-3 px-3">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="max-lg:border-b max-lg:py-3 px-3">
                            <NavLink
                                to="/about-us"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li className="max-lg:border-b max-lg:py-3 px-3">
                            <NavLink
                                to="/contact-us"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center max-lg:ml-auto space-x-3">
                    <ModeToggle />
                    {token ? (
                        <div className="relative">
                            <button
                                onClick={handleDropdownToggle}
                                className="flex items-center space-x-2"
                            >
                                <User2 size={25} />
                            </button>
                            <div
                                onClick={() => setIsDropdownOpen(false)}
                                className={`fixed inset-0 z-10 w-full h-full ${
                                    isDropdownOpen ? "" : "hidden"
                                }`}
                            ></div>
                            {isDropdownOpen && (
                                <AvatarDropdown handleLogout={handleLogout} />
                            )}
                        </div>
                    ) : (
                        <>
                            <Button asChild>
                                <Link to={"/login"} className="hidden md:flex">
                                    Login
                                </Link>
                            </Button>
                            <Button asChild variant={"outline"}>
                                <Link
                                    to={"/register"}
                                    className="hidden md:flex"
                                >
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden"
                    >
                        <LucideMenu size={25} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
