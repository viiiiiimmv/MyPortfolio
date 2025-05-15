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
import ProjectPanel from './components/ProjectPanel';
import useIsMobile from './hooks/useIsMobile'; // <-- Import custom hook
import MobileOutro from './components/MobileOutro';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const isMobile = useIsMobile(); // <-- Get device type

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {!showLoader && (
        <BackgroundAudio
          src="/assets/betterdays.mp3"
          volume={isMuted ? 0 : volume}
        />
      )}
      {showLoader ? (
        <HomeLoader />
      ) : ( */}
        <>
          <CustomCursor />
          <Hero isMuted={isMuted} setIsMuted={setIsMuted} />
          <PostHero />
          {isMobile ? <ProjectPanel /> : <Projects />} {/* Conditional rendering */}
          {isMobile ? <MobileOutro /> : <Stats />} {/* Conditional rendering */}
          <FooterContent />
        </>
      {/* )} */}
    </>
  );
}

export default App;
