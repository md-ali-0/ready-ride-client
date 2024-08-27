import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ContactUsSection: FC = () => {
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
                <div className="flex flex-col lg:flex-row justify-between items-start p-8 gap-5">
                    {/* Find Us Section */}
                    <div className="w-full lg:w-1/2 bg-white shadow-lg p-8 rounded-lg">
                        <h2 className="text-xl font-bold mb-6">Find us here</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <MapPin className="text-xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p>NY, United States</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Mail className="text-xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p>demo@demo.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="text-xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p>+129290122122</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-6">
                            <Facebook className="text-xl text-gray-500 cursor-pointer hover:text-blue-600" />
                            <Twitter className="text-xl text-gray-500 cursor-pointer hover:text-blue-400" />
                            <Instagram className="text-xl text-gray-500 cursor-pointer hover:text-pink-500" />
                        </div>
                    </div>

                    {/* Get in Touch Section */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-xl font-bold mb-6">Get in touch</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block font-semibold mb-2"
                                        htmlFor="name"
                                    >
                                        Your Name (required)
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block font-semibold mb-2"
                                        htmlFor="email"
                                    >
                                        Your Email (required)
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block font-semibold mb-2"
                                    htmlFor="subject"
                                >
                                    Subject*
                                </label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Enter Your Subject"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block font-semibold mb-2"
                                    htmlFor="message"
                                >
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Write your message here"
                                    className="w-full p-3 h-32 border border-gray-300 rounded"
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsSection;
