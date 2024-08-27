import ContactUsSection from '@/components/contact-us-section';
import FeaturedSection from '@/components/featured-section';
import HeroBanner from '@/components/hero-banner';
import Testimonial from '@/components/testimonial';
import WhyChooseUs from '@/components/why-choose-us';
import { FC } from 'react';


const Home: FC = () => {
  return (
    <>
      <HeroBanner/>
      <FeaturedSection/>
      <Testimonial/>
      <WhyChooseUs/>
      <ContactUsSection/>
    </>
  );
};

export default Home;