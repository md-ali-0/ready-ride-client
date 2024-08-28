import milestoneBanner from "@/assets/image/banner/milestones.png";
import { FC } from "react";

const OurMilestone: FC = () => {
    return (
        <section className="w-full py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Our Milestone
                    </h2>
                    <p className="text-muted-foreground text-center max-w-96">
                        Our dedicated team of experts is committed to delivering
                        the best possible experience for our customers.
                    </p>
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-10 gap-10">
                    <div>
                        <div className="flex gap-x-3">
                            <div className="w-16 text-end">
                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                    2017
                                </span>
                            </div>

                            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                <div className="relative z-10 size-7 flex justify-center items-center">
                                    <div className="size-2 rounded-full bg-primary" />
                                </div>
                            </div>

                            <div className="hover:bg-primary hover:text-white grow pt-3 pb-6 px-5 rounded-xl cursor-pointer">
                                <h3 className="flex gap-x-1.5 font-semibold">
                                    First 1000 Rentals
                                </h3>
                                <p className="mt-1 text-sm dark:text-white">
                                    ReadyRide reached a significant milestone
                                    with 1000 bike rentals, marking our success
                                    in the industry.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <div className="w-16 text-end">
                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                    2019
                                </span>
                            </div>

                            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                <div className="relative z-10 size-7 flex justify-center items-center">
                                    <div className="size-2 rounded-full bg-primary" />
                                </div>
                            </div>

                            <div className="hover:bg-primary hover:text-white grow pt-3 pb-6 px-5 rounded-xl cursor-pointer">
                                <h3 className="flex gap-x-1.5 font-semibold">
                                    Expanded to 10 Cities
                                </h3>
                                <p className="mt-1 text-sm dark:text-white">
                                    We expanded our services to 10 cities,
                                    providing more customers with easy access to
                                    our bikes.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <div className="w-16 text-end">
                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                    2021
                                </span>
                            </div>

                            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                <div className="relative z-10 size-7 flex justify-center items-center">
                                    <div className="size-2 rounded-full bg-primary" />
                                </div>
                            </div>

                            <div className="hover:bg-primary hover:text-white grow pt-3 pb-6 px-5 rounded-xl cursor-pointer">
                                <h3 className="flex gap-x-1.5 font-semibold">
                                    Launched Electric Bikes
                                </h3>
                                <p className="mt-1 text-sm dark:text-white">
                                    The introduction of electric bikes to our
                                    fleet marked a new era of eco-friendly
                                    transportation at ReadyRide.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <div className="w-16 text-end">
                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                    2023
                                </span>
                            </div>

                            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                <div className="relative z-10 size-7 flex justify-center items-center">
                                    <div className="size-2 rounded-full bg-primary" />
                                </div>
                            </div>

                            <div className="hover:bg-primary hover:text-white grow pt-3 pb-6 px-5 rounded-xl cursor-pointer">
                                <h3 className="flex gap-x-1.5 font-semibold">
                                    50,000th Rental
                                </h3>
                                <p className="mt-1 text-sm dark:text-white">
                                    ReadyRide celebrated its 50,000th rental,
                                    solidifying our position as a leading bike
                                    rental service.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <img
                            src={milestoneBanner}
                            alt="Milestone Banner"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurMilestone;
