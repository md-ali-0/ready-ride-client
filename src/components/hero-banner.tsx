// import bannerImage from "@/assets/image/banner/hero-banner.jpg";
import bannerImage from "@/assets/image/banner/banner.png";
import { FC } from "react";
import { Link } from "react-router-dom";

const HeroBanner: FC = () => {
    
    return (
        <section
            className={`relative bg-cover bg-right sm:bg-center bg-no-repeat`}
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="absolute inset-0 bg-gray-900/75 sm:bg-gradient-to-r sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25"></div>

            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Ride Through the City
                        <strong className="block font-extrabold text-primary">
                            at Your Own Pace.
                        </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Affordable Bike Rentals for Your Next Urban Adventure
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            to="#"
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                        >
                            Get Started
                        </Link>

                        <button
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary/90 focus:outline-none focus:ring active:text-primary sm:w-auto"
                        >
                            Search Here
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
