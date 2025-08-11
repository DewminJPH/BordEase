import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import FilterTabs from '../FilterTabs';
import PropertyCards from '../PropertyList';
import Services from '../Services';

function Home() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PropertyCards/>
      <Services/>
    </>
  );
}
export default Home;