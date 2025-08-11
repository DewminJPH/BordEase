import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import FilterTabs from '../FilterTabs';
import PropertyCards from '../PropertyList';
import Services from '../Services';
import Agents from '../Agents'
import Feedback from '../Feedback';
import Footer from '../Footer';

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