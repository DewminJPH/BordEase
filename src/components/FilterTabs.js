import React from 'react';
import './FilterTabs.css';

const FilterTabs = () => {
  const tabs = ["Latest", "Booked", "Featured homes", "Land", "view all"];

  return (
    <div className="filter-tabs-container">
      {tabs.map((tab, index) => (
        <div 
          key={index} 
          className={`filter-tab ${tab === "Featured homes" ? 'no-hover' : ''}`}
          >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default FilterTabs;