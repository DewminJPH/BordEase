import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import FilterTabs from '../FilterTabs';
import PropertyCards from '../PropertyList';

function Home() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PropertyCards/>
    </>
  );
}
export default Home;