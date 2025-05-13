import React from 'react';
import '../assets/css/MobileOutro.css';

const MobileOutro = () => {
  return (
    <section className="mini-intro-section">
      <h1 className="intro-heading">
        Fueled by code, coffee, and a passion for photography.
        <br />
        Building experiences that connect and inspire.
      </h1>

      <a
        href="https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link" // Make sure to place your resume here
        download
        className="resume-download"
      >
        Download My Resume
      </a>

      <div className="closing-text">
        <p>
          Wanna have a coffee with me?
          <br />
          <a href="#contact">Feel free to drop me a message!!</a>
        </p>
      </div>
    </section>
  );
};

export default MobileOutro;
