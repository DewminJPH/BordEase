import React from 'react';
import './StatsBar.css';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home11Icon,AddTeamIcon,CommentAdd01Icon,MedalFirstPlaceIcon } from '@hugeicons/core-free-icons';

const StatsBar = ({ stats,theme='light' }) => {

  const iconConfig = [
    {icon: Home11Icon, size: 50, color: '#113E21'},
    {icon: AddTeamIcon, size: 50, color: '#113E21'},
    {icon: CommentAdd01Icon, size: 50, color: '#113E21'},
    {icon: MedalFirstPlaceIcon, size: 50, color: '#113E21'}
  ];

  return (
    <div className={`stats-bar ${theme}`}>
      {stats.map((item, index) => (
        <div key={index} className="stat-item">
          <div className="stat-header">
            <HugeiconsIcon 
              icon={iconConfig[index].icon} 
              size={30} 
              color={iconConfig[index % iconConfig.length].color}
              strokeWidth={1.5}
              className="stat-icon"
            />
            <div className="stat-number">{item.number}</div>
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

StatsBar.defaultProps = {
  stats: [
    { number: '#1', label: 'Website Rank' },
    { number: '50,000+', label: 'Feedbacks' },
    { number: '1,000+', label: 'Listings' },
    { number: '259K', label: 'Monthly Visitors' }
  ],
};

export default StatsBar;