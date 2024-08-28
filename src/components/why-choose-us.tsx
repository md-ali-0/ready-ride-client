import { Bike, CircleDollarSign, Headset, MapPin } from "lucide-react";
import { FC } from "react";

const WhyChooseUs: FC = () => {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Why Choose Us
                    </h2>
                    <p className="text-muted-foreground">
                        Check out our latest and greatest Bikes.
                    </p>
                </div>
                <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="group relative cursor-pointer overflow-hidden bg-background border px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-xl sm:px-10">
                        <span className="absolute top-8 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-primary to-pink-600 transition-all duration-300 group-hover:scale-[20]" />
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary">
                                <Bike className="h-10 w-10 text-white transition-all" />
                            </span>
                            <h3 className="text-xl group-hover:text-white transition-all duration-300 font-medium py-2.5">
                                Wide Range of Bikes
                            </h3>
                            <div className="space-y-6 text-base leading-7 text-muted-foreground transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Choose from a variety of bikes, including
                                    city cruisers, mountain bikes, and e-bikes,
                                    tailored to your riding style.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative cursor-pointer overflow-hidden bg-background border px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-xl sm:px-10">
                        <span className="absolute top-8 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-primary to-pink-600 transition-all duration-300 group-hover:scale-[20]" />
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary">
                                <CircleDollarSign className="h-10 w-10 text-white transition-all" />
                            </span>
                            <h3 className="text-xl group-hover:text-white font-medium py-2.5">
                                Flexible Rental Plans
                            </h3>
                            <div className="space-y-6 text-base leading-7 text-muted-foreground transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Enjoy hourly, daily, or weekly rental
                                    options that fit your schedule and budget.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative cursor-pointer overflow-hidden bg-background border px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-xl sm:px-10">
                        <span className="absolute top-8 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-primary to-pink-600 transition-all duration-300 group-hover:scale-[20]" />
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary">
                                <MapPin className="h-10 w-10 text-white transition-all" />
                            </span>
                            <h3 className="text-xl group-hover:text-white font-medium py-2.5">
                                Convenient Locations
                            </h3>
                            <div className="space-y-6 text-base leading-7 text-muted-foreground transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Pick up and drop off at multiple spots
                                    across the city for hassle-free access
                                    wherever you are.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative cursor-pointer overflow-hidden bg-background border px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-xl sm:px-10">
                        <span className="absolute top-8 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-primary to-pink-600 transition-all duration-300 group-hover:scale-[20]" />
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-primary">
                                <Headset className="h-10 w-10 text-white transition-all" />
                            </span>
                            <h3 className="text-xl group-hover:text-white font-medium py-2.5">
                                24/7 Customer Support
                            </h3>
                            <div className="space-y-6 text-base leading-7 text-muted-foreground transition-all duration-300 group-hover:text-white/90">
                                <p>
                                    Our friendly team is always available to
                                    assist you, ensuring a smooth and enjoyable
                                    ride.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
