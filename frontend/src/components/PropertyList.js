import React from 'react';
import './PropertyList.css';
import property1 from '../Assets/image 1.png';
import property2 from '../Assets/image 2.jpeg';
import property3 from '../Assets/image 3.png';
import property4 from '../Assets/image 9.jpeg';
import property5 from '../Assets/image 5.jpg';

const PropertyCards = () => {
  const properties = [
    {
      id: 1,
      image: property1,
      title: "W.K.D weerasinghe",
      price: "Rs. 32,000/month",
      details: ["A 05", "B 02", "C5"],
      tag: "Hapugala"
    },
    {
      id: 2,
      image: property2,
      title: "A.D.H. Subhasinghe",
      price: "Rs. 40,000/month",
      details: ["A 07", "B 02", "C8"],
      tag: "Asapuwa"
    },
    {
      id: 3,
      image: property3,
      title: "C.D.B. Rathnasiri",
      price: "Rs. 30,000/month",
      details: ["A 05", "B 01", "C5"],
      tag: "Niladeniya"
    },
    {
      id: 4,
      image: property4,
      title: "A.B. Abeykoon",
      price: "Rs. 30,000/month",
      details: ["A 05", "B 01", "C5"],
      tag: "Sarasavi Uyana"
    },
    {
      id:5,
      image: property5,
      title: "J.D.Dasanayake",
      price: "Rs.50,000/month",
      details:["A 06","B 03", "C5"],
      tag: "Darlington"
    }
  ];

  return (
    <div className="property-cards-container">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <div className="property-tag">{property.tag}</div>
          <img 
            src={property.image} 
            alt={property.title} 
            className="property-image"
          />
          <div className="property-content">
            <h3>{property.title}</h3>
            <p className="property-price">{property.price}</p>
            <div className="property-details">
              {property.details.map((detail, index) => (
                <span key={index}>{detail}</span>
              ))}
            </div>
            <div className="location-button">Location</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCards;