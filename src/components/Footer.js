import React from 'react';
import './Footer.css';
import { HugeiconsIcon } from '@hugeicons/react';
import { TiktokIcon, YoutubeIcon, Linkedin02Icon, Facebook01Icon } from '@hugeicons/core-free-icons';

const Footer = () => {
  return(
    <div className="footer-container">
      <div className="upper-line"></div>
      <div className="logo">BORDEASE</div>
      <div className="footer-content">
        <div className="column">
          <h3>Company</h3>
            <ul> 
              <li>About us</li>
              <li>Awards & Recognition</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Our Methods (How we select properties)</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        <div className="column">
          <h3>Our Services</h3>
            <ul> 
              <li>Affordable Room Rentals</li>
              <li>All-Inclusive Bills (WiFi, Utilities, Laundry)</li>
              <li>24/7 Security & Maintenance</li>
              <li>Study Lounges & Quiet Zones</li>
              <li>Flexible Lease Terms</li>
              <li>Community Events</li>
            </ul>
          </div>
        <div className="column">
          <h3>Who We Serve</h3>
            <ul> 
              <li>University Students</li>
              <li>International Students</li>
              <li>Interns & Trainees</li>
              <li>Postgraduate Researchers</li>
              <li>Exchange Program Students</li>
              <li>Summer School Attendees</li>
            </ul>
          </div>
      </div>
      <div className="bottom-line"></div>
      <div className="bottom-content">
        <p>© 2025 BoardEase. All rights reserved.  [Privacy Policy] | [Terms of Use] | [Sitemap] | [FAQ]</p>
        <div className="social-icons">
          <HugeiconsIcon
            icon={TiktokIcon}
            size={24}
            color="white"
            className="social-icon"
          />
          <HugeiconsIcon
            icon={YoutubeIcon}
            size={24}
            color="white"
            className="social-icon"
          />
          <HugeiconsIcon
            icon={Linkedin02Icon}
            size={24}
            color="white"
            className="social-icon"
          />
          <HugeiconsIcon
            icon={Facebook01Icon}
            size={24}
            color="white"
            className="social-icon"
          />
        </div>
      </div>
    </div>
  );
};
export default Footer;