import React from 'react';
import './Welcome.css';
import homeBackground from '../assets/home.jpeg';

const Welcome = () => {
  return (
    <div className="welcome-container" style={{backgroundImage: `url(${homeBackground})`}}>
      <div className="welcome-content">
        <h1 className="welcome-text">Welcome to</h1>
        <h2 className="cafe-name">Vintage Cafe</h2>
      </div>
    </div>
  );
};

export default Welcome;