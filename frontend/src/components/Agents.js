import React from 'react';
import './Agents.css';
import emily from '../Assets/Person1.png';
import william from '../Assets/Person2.png';
import oliver from '../Assets/Person3.png';
import sophia from '../Assets/Person4.png';

const Agents = () => {
  const agents = [
    { name: "Emily Wilson", image: emily },
    { name: "William Alexander", image: william },
    { name: "Oliver James", image: oliver },
    { name: "Sophia Elizabeth", image: sophia }
  ];

  return (
    <section className="agents-section">
      <div className="section-header">
        <h5>Agents</h5>
        <h3>Experts that take care of you</h3>
      </div>
      
      <div className="agents-grid">
        {agents.map((agent, index) => (
          <div key={index} className="agent-card">
            <img 
              src={agent.image} 
              alt={agent.name}
              className="agent-image"
            />
            <h3 className="agent-name">{agent.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agents;