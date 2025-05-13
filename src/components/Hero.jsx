// Hero.jsx
import '../assets/css/Hero.css';
import VolumeControl from './VolumeControl';

export default function Hero({ isMuted, setIsMuted }) {
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
        <h1>THIS IS <br /> SHIV CHAUHAN .</h1>
        <p>Hey there! Glad you stopped by — feel free to explore and get to know a little more about me.</p>
      </div>
    </section>
  );
}
