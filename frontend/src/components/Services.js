import React from 'react';
import './Services.css';
import ytImage from '../Assets/image yt.png';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon,ArrowLeft02Icon,Timer02Icon,MapsLocation01Icon,CheckmarkBadge03Icon} from '@hugeicons/core-free-icons';

const Services = () => {
  return (
    <div className="services-container">
      <div className="green-rectangle">
        <HugeiconsIcon
          icon={ArrowRight02Icon }
          size={50}
          color="#85B86F"
          strokeWidth={1.5}
          className="move-right-arrow" 
        />
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          size={35}
          color="#7E7E7E"
          strokeWidth={1.5}
          className="move-left-arrow"  
        />
      </div>
      <img 
        src={ytImage} 
        alt="YouTube Channel" 
        className="overlay-image"
      />
      <div className="redcircle"></div>
      <div className="triangle"></div>
      <div className="text-content">
        <h2>Your house now</h2>
        <div className="inline-group">
          <p className="inline-item">Sunrise Residences - 5 mins</p>
          <h3 className="inline-item">Faculty of Engineering</h3>
        </div>
      </div>
      <div className="services-content">
        <h5>best service</h5>
        <h3>Why choose us our service</h3>
        <HugeiconsIcon
          icon={Timer02Icon}
          size={35}
          color="black"
          strokeWidth={1.5}
          className="save-time"  
        />
        <HugeiconsIcon
          icon={MapsLocation01Icon}
          size={35}
          color="black"
          strokeWidth={1.5}
          className="map"  
        />
        <HugeiconsIcon
          icon={CheckmarkBadge03Icon}
          size={35}
          color="black"
          strokeWidth={1.5}
          className="verify"  
        />
        <h4>Time-Saving Process</h4>
            <p> Find and book your perfect room in minutes with our
 easy online platform. No endless searching - just quality 
options tailored for students.</p>
        <h4>Easy to Find Locations</h4>
            <p>All our properties are conveniently located near major 
universities and public transport, making your daily commute 
simple.</p>
        <h4>Trusted by Students</h4>
          <p>"Living here made my first year so much easier!" - Sarah, 
3rd year Medical student. Join hundreds of satisfied students 
who call our spaces home.</p>
      </div>
    </div>
  );
};

export default Services;