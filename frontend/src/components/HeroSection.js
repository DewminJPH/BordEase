import React from 'react';
import '../App.css';
import './HeroSection.css';
import backgroundImage from '../Assets/image 6.png';
import StatsBar from './StatsBar/StatsBar';

function HeroSection() {
  return(
    <div className="hero-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay-left"></div>
        <div className="hero-content">
          <h1>A peaceful place to</h1>
          <h1>study, rest and thrive.</h1>
          <p>Your ideal student home - affordable,comfortable and designed for success.</p>
          <p>Enjoy quiet study spaces, all-inclusive amenities and a welcoming community.</p>
        </div>
        <div className="sorting-strip">
          <div className="sorting-segment">
            <span>Location ▼</span>
            <div className="subtext">Faculty of Engineering, Ruhuna</div>
          </div>
          <div className="sorting-segment">
            <span>Minimum price ▼</span>
            <div className="subtext">Rs.20,000</div>
          </div>
          <div className="sorting-segment">
            <span>Maximum price ▼</span>
            <div className="subtext">Rs.70,000</div>
          </div>
          <div className="sorting-segment">
            <span>Ratings ▼</span>
            <div className="subtext">4 star or above</div>
          </div>
          <div className="sorting-segment search">
            <span>Search</span>
          </div>
        </div>
        <div className="stats-container">
          <StatsBar 
            stats={[
              { number: '1,000+', label: 'Home listing available' },
              { number: '1M', label: 'Monthly visitors' },
              { number: '50,000+', label: 'Feedbacks' },
              { number: '#1', label: 'Website Rank' }
            ]}
          />
        </div>
    </div>
  )
}

export default HeroSection;