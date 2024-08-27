import FeaturedSection from '@/components/featured-section';
import HeroBanner from '@/components/hero-banner';
import { FC } from 'react';


const Home: FC = () => {
  return (
    <>
      <HeroBanner/>
      <FeaturedSection/>
    </>
  );
};

export default Home;