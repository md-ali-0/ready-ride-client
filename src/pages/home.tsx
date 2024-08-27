import FeaturedSection from '@/components/featured-section';
import HeroBanner from '@/components/hero-banner';
import Testimonial from '@/components/testimonial';
import { FC } from 'react';


const Home: FC = () => {
  return (
    <>
      <HeroBanner/>
      <FeaturedSection/>
      <Testimonial/>
    </>
  );
};

export default Home;