import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero.jsx';
import PostHero from './components/PostHero.jsx';
import Projects from './components/Projects.jsx';
import FooterContent from './components/FooterContent.jsx';
import Stats from './components/Stats.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import HomeLoader from './components/HomeLoader.jsx'; // Import the loader

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000); // Loader will be shown for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? <HomeLoader /> : (
        <>
          <CustomCursor />
          <Hero />
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
