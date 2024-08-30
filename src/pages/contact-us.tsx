import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapIcon, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactUs() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sending message:", { name, email, message });
        setName("")
        setEmail("")
        setMessage("")
        toast.success("Thanks for contacting us.");
    };

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Contact Information */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Contact Us</h2>
                        <p className="mt-3 text-muted-foreground">
                            Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <MapIcon className="text-primary" />
                            <p className="text-lg">123 Bike Lane, Cityville, ST 12345</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="text-primary" />
                            <p className="text-lg">support@example.com</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="text-primary" />
                            <p className="text-lg">+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                required
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
