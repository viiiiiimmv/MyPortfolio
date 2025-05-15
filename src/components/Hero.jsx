import '../assets/css/Hero.css';
import VolumeControl from './VolumeControl';

export default function Hero({ isMuted, setIsMuted }) {
  const headingText = "THIS IS \nSHIV CHAUHAN .";

  return (
    <section className="hero-section">
      <nav>
        <VolumeControl isMuted={isMuted} setIsMuted={setIsMuted} />
        <span className='nav-links'>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </span>
      </nav>
      <div className="hero-content">
        <h1 className="animated-heading">
          {headingText.split('').map((char, index) => {
            if (char === '\n') return <br key={index} />;
            return (
              <span key={index} className="char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h1>
        <p>
          Hey there! Glad you stopped by — feel free to explore and get to know a little more about me.
        </p>
      </div>
    </section>
  );
}
