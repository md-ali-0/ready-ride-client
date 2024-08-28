import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const OurTeam = () => {
    const teamMembers = [
        {
            name: "Maya Patel",
            role: "UX/UI Designer",
            img: "https://xsgames.co/randomusers/assets/avatars/male/71.jpg",
            social: {
                facebook: "https://www.facebook.com/facebook",
                linkedIn: "https://www.linkedin.com/linkedin",
                twitter: "https://www.twitter.com/twitter",
                instagram: "https://www.instagram.com/instagram",
            },
        },
        {
            name: "Kai Chen",
            role: "Full-Stack Developer",
            img: "https://xsgames.co/randomusers/assets/avatars/male/64.jpg",
            social: {
                facebook: "https://www.facebook.com/facebook",
                linkedIn: "https://www.linkedin.com/linkedin",
                twitter: "https://www.twitter.com/twitter",
                instagram: "https://www.instagram.com/instagram",
            },
        },
        {
            name: "Sofia Rodriguez",
            role: "Marketing Manager",
            img: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg",
            social: {
                facebook: "https://www.facebook.com/facebook",
                linkedIn: "https://www.linkedin.com/linkedin",
                twitter: "https://www.twitter.com/twitter",
                instagram: "https://www.instagram.com/instagram",
            },
        },
        {
            name: "David Jones",
            role: "Customer Support Specialist",
            img: "https://xsgames.co/randomusers/assets/avatars/female/63.jpg",
            social: {
                facebook: "https://www.facebook.com/facebook",
                linkedIn: "https://www.linkedin.com/linkedin",
                twitter: "https://www.twitter.com/twitter",
                instagram: "https://www.instagram.com/instagram",
            },
        },
    ];

    return (
        <section className="w-full py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Meet Our Team
                    </h2>
                    <p className="text-muted-foreground text-center max-w-96">
                        Our dedicated team of experts is committed to delivering
                        the best possible experience for our customers.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-primary dark:border-gray-700 dark:hover:border-transparent"
                        >
                            <img
                                className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                                src={member.img}
                                alt=""
                            />

                            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                                {member.name}
                            </h1>

                            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                                {member.role}
                            </p>

                            <div className="flex mt-3 -mx-2">
                                <Link
                                    to={"https://facebook.com/facebook"}
                                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <Facebook />
                                </Link>
                                <Link
                                    to={"https://www.linkedin.com/linkedin"}
                                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                                    aria-label="Linkedin"
                                >
                                    <Linkedin />
                                </Link>
                                <Link
                                    to={"https://x.com/twitter"}
                                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                                    aria-label="Twitter"
                                >
                                    <Twitter />
                                </Link>
                                <Link
                                    to={"https://instagram.com/instagram"}
                                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <Instagram />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
