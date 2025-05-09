import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero.jsx';
import PostHero from './components/Post-Hero.jsx';
import Projects from './components/Projects.jsx';
import Stats from './components/Stats.jsx';
import FooterContent from './components/FooterContent.jsx';
import HomeLoader from './components/HomeLoader.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => setIsLoading(false), 1000); // Optional delay
    });
  }, []);

  return (
    <>
      <Hero />
      <PostHero />
      <Projects />
      <FooterContent />
    </>
  );
}

export default App;
