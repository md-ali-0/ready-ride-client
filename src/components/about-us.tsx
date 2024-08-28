import bannerImage from "@/assets/image/banner/about-us.png";

const AboutUsSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            Our Mission
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Mission Statement
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            At ReadyRide our mission is to empower individuals
                            and businesses with cutting-edge technology
                            solutions that drive growth, innovation, and
                            success. We are committed to delivering high-quality
                            products and services that exceed our customers'
                            expectations, while fostering a culture of
                            integrity, creativity, and collaboration.
                        </p>
                    </div>
                    <img
                        src={bannerImage}
                        width="550"
                        height="350"
                        alt="About Us"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
