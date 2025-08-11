import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import FilterTabs from '../FilterTabs';
import PropertyCards from '../PropertyList';
import Services from '../Services';
import Agents from '../Agents'
import Feedback from '../Feedback';

function Home() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PropertyCards/>
      <Services/>
      <Agents/>
      <Feedback/>
    </>
  );
}
export default Home;