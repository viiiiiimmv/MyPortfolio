import React, { useState, useEffect } from 'react';
import '../assets/css/Stats.css';
import ProblemStatsChart from './ProblemStatsChart';
import images from '../assets/data/imageData';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link';
  link.download = 'resume.pdf';
  link.click();
}

const Stats = () => {
  const [currentImage, setCurrentImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[nextIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLeftCardClick = () => {
    window.open('https://www.instagram.com/stealthy.shutter?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank');
  };

  return (
    <div className="portfolio-container">
      <h1>
        Fueled by code, coffee, and a passion for photography.
        <br />
        Building experiences that connect and inspire.
      </h1>
      <hr />
      <div className="cards">
        <div
          className="card left-card fade-image"
          style={{
            backgroundImage: `url(${currentImage})`
          }}
          onClick={handleLeftCardClick} // Add the click handler here
        ></div>
        <div className="card right-card">
          <div className="section-1">
            <ProblemStatsChart username="shivchauhan" />
          </div>
          <div className="section-2" onClick={handleDownload}>
            View My Resume
          </div>
          <div className="section-3">
            <p>
              Wanna have a coffee with me? 
              <br />
              <a href="#contact">Feel free to drop me a message!!</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
