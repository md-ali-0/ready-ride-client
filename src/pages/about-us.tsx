import AboutUsSection from "@/components/about-us";
import ContactInformation from "@/components/contact-information";
import OurMilestone from "@/components/our-milestone";
import OurTeam from "@/components/our-team";


export default function AboutUs() {
    return (
        <>
            <AboutUsSection />
            <OurTeam />
            <OurMilestone/>
            <ContactInformation />
        </>
    );
}
