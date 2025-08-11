import React from 'react';
import HeroSection from '../components/HeroSection';
import FilterTabs from '../components/FilterTabs';
import PropertyCards from '../components/PropertyList';
import Services from '../components/Services';
import Agents from '../components/Agents'
import Feedback from '../components/Feedback';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PropertyCards/>
      <Services/>
      <Agents/>
      <Feedback/>
      <Footer/>
    </>
  );
}
export default Home;