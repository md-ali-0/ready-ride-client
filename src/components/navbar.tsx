import logoDark from "@/assets/image/logo/logo-dark.png";
import logo from "@/assets/image/logo/logo.svg";
import { LucideMenu, X } from "lucide-react";
import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

const Navbar: FC = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex border-b min-h-[70px] tracking-wide relative z-50">
            <div className="container py-4 px-4 mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-5 w-full">
                    <Link to={"/"}>
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
                            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-1.5"
                        >
                            <X size={25} />
                        </button>
                        <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li className="mb-6 hidden max-lg:block">
                                <Link to={"/"}>
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
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
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
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
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
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex max-lg:ml-auto space-x-3">
                        <ModeToggle />
                        <Button asChild>
                            <Link to={"/login"} className="hidden md:flex">
                                Login
                            </Link>
                        </Button>
                        <Button asChild variant={"outline"}>
                            <Link to={"/register"} className="hidden md:flex">
                                Register
                            </Link>
                        </Button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden"
                        >
                            <LucideMenu size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
