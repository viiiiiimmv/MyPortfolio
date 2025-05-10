// App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import PostHero from './components/PostHero';
import Projects from './components/Projects';
import FooterContent from './components/FooterContent';
import Stats from './components/Stats';
import CustomCursor from './components/CustomCursor';
import HomeLoader from './components/HomeLoader';
import BackgroundAudio from './components/BackgroundAudio';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showLoader && (
        <BackgroundAudio
          src="/assets/betterdays.mp3"
          volume={isMuted ? 0 : volume}
        />
      )}
      {showLoader ? (
        <HomeLoader />
      ) : (
        <>
          <CustomCursor />
          <Hero isMuted={isMuted} setIsMuted={setIsMuted} />
          <PostHero />
          <Projects />
          <Stats />
          <FooterContent />
        </>
      )}
    </>
  );
}

export default App;
