import logoDark from "@/assets/image/logo/logo-dark.png";
import { LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <Link to={"/"}>
                        <img src={logoDark} alt="logo" className="w-24" />
                    </Link>
                    <p className="mt-4 text-gray-300">
                        At ReadyRide our mission is to empower individuals and
                        businesses with cutting-edge technology solutions that
                        drive growth, innovation, and success.
                    </p>
                    <div className="mt-5 flex space-x-4">
                        <div className="border border-gray-700 rounded-full p-2">
                            <LucideFacebook size={18} />
                        </div>
                        <div className="border border-gray-700 rounded-full p-2">
                            <LucideTwitter size={18} />
                        </div>
                        <div className="border border-gray-700 rounded-full p-2">
                            <LucideInstagram size={18} />
                        </div>
                    </div>
                </div>
                <div></div>
                <div>
                    <h3 className="font-semibold">PRODUCTS</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link
                                to={"/bikes"}
                                className="text-gray-400 hover:text-white"
                            >
                                All Bikes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/my-rentals"}
                                className="text-gray-400 hover:text-white"
                            >
                                My Rentals
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">IMPORTANT LINKS</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link
                                to={"/"}
                                className="text-gray-400 hover:text-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/#"}
                                className="text-gray-400 hover:text-white"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/contact-us"}
                                className="text-gray-400 hover:text-white"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/#"}
                                className="text-gray-400 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div>
                    <h3 className="font-semibold">COMPANY</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link
                                to={'/'}
                                className="text-gray-400 hover:text-white"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/'}
                                className="text-gray-400 hover:text-white"
                            >
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/'}
                                className="text-gray-400 hover:text-white"
                            >
                                Press
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/'}
                                className="text-gray-400 hover:text-white"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div className="container mx-auto">
                <div className="border-t border-slate-800 text-center text-gray-200 mt-5 pt-6">
                    © {new Date().getFullYear()} ReadyRide. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
