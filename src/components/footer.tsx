import logoDark from "@/assets/image/logo/logo-dark.png";
import logo from "@/assets/image/logo/logo.svg";
import { LucideFacebook, LucideGithub, LucideTwitter } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";

const Footer: FC = () => {
    const { theme } = useTheme();
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="container px-4 py-8 mx-auto">
                <div className="flex flex-col items-center text-center">
                    <Link to={"/"}>
                        {theme == "dark" || theme == "system" ? (
                            <img src={logoDark} alt="logo" className="w-24" />
                        ) : (
                            <img src={logo} alt="logo" className="w-24" />
                        )}
                    </Link>
                    <div className="flex flex-wrap justify-center mt-6 -mx-4">
                        <Link
                            to="#"
                            className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            aria-label="Reddit"
                        >
                            {" "}
                            Home{" "}
                        </Link>
                        <Link
                            to="#"
                            className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            aria-label="Reddit"
                        >
                            {" "}
                            About{" "}
                        </Link>
                        <Link
                            to="#"
                            className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            aria-label="Reddit"
                        >
                            {" "}
                            Teams{" "}
                        </Link>
                        <Link
                            to="#"
                            className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            aria-label="Reddit"
                        >
                            {" "}
                            Privacy{" "}
                        </Link>
                        <Link
                            to="#"
                            className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            aria-label="Reddit"
                        >
                            {" "}
                            Cookies{" "}
                        </Link>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        © Copyright {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                    <div className="flex -mx-2">
                        <Link
                            to="#"
                            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Facebook"
                        >
                           <LucideFacebook size={20}/>
                        </Link>
                        <Link
                            to="#"
                            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Facebook"
                        >
                           <LucideTwitter size={20}/>
                        </Link>
                        <Link
                            to="#"
                            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Github"
                        >
                            <LucideGithub size={20}/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
