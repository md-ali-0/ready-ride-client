const ContactInformation = () => {
    return (
        <section className="">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Contact Information
                    </h2>
                    <p className="text-muted-foreground">
                        Check out our ReadyRide Locations.
                    </p>
                </div>
                <div className="mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                                width="100%"
                                height={480}
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h3 className="text-lg font-medium">
                                        Our Address
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        123 Main St, San Francisco, CA 94105
                                    </p>
                                </div>
                                <div className="border-t px-6 py-4">
                                    <h3 className="text-lg font-medium">
                                        Hours
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        Monday - Friday: 9am - 5pm
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Saturday: 10am - 4pm
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Sunday: Closed
                                    </p>
                                </div>
                                <div className="border-t px-6 py-4">
                                    <h3 className="text-lg font-medium">
                                        Contact
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        Email: readyride@gmail.com
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Phone: +8801916498482
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInformation;
