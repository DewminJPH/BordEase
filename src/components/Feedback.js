import React from 'react';
import './Feedback.css';
import feedbackImage from '../Assets/Feedback.png'; 
import { HugeiconsIcon } from '@hugeicons/react';
import { QuoteUpIcon } from '@hugeicons/core-free-icons';
import myimage from '../Assets/Me.png';

const Feedback = () => {
  return(
    <div className="feedback-container">
      <div className="circle"></div>
      <div className="rectangle"></div>
      <img
        src={feedbackImage}
        alt="Feedback Image"
        className="feedback-image"
      />
      <div className="feedback-content">
        <h5>What our clients say</h5>
        <h3>People say about us</h3>
          <HugeiconsIcon
            icon={QuoteUpIcon}
            size={35}
            color="#113E21"
            strokeWidth={1.5}
            className="symbol-quote"  
          />
        <p className="feedback">             Living here transformed my university experience. The quiet study spaces, reliable WiFi, and friendly community made it effortless to balance academics and social life. I couldn’t have asked for a better home during my degree.</p>
        <img
          src={myimage}
          alt="Client Image"
          className="client-image"
        />  
        <h2 className="client-name">Himansha Dewmin</h2>
        <p className="reg-no">Second Year Student - EG/2022/4994</p>
      </div>
    </div>
  );
};
export default Feedback;
