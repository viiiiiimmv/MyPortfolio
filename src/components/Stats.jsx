import React from 'react';
import '../assets/css/Stats.css'; // We'll create this CSS file
import ProblemStatsChart from './ProblemStatsChart'; // Assuming this is the path to your chart component

const Stats = () => {
  return (
    <div className="portfolio-container">
      <h1>
        Fueled by code, coffee, and a passion for photography.
        <br />
        Building experiences that connect and inspire.
      </h1>
      <hr />
      <div className="cards">
        <div className="card left-card "></div>
        <div className="card right-card">
          <div className="section-1">
            <ProblemStatsChart username="shivchauhan" />
          </div>
          <div className="section-2">"98% caffeinated, 2% still sleepy." </div>
          <div className="section-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
