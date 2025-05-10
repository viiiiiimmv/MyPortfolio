import './App.css';
import Hero from './components/Hero.jsx';
import PostHero from './components/PostHero.jsx';
import Projects from './components/Projects.jsx';
import FooterContent from './components/FooterContent.jsx';
import Stats from './components/Stats.jsx';
import CustomCursor from './components/CustomCursor.jsx'; // Importing the custom cursor component
function App() {
  
  return (
    <>
      <CustomCursor />
      <Hero />
      <PostHero />
      <Projects />
      {/* <Stats/> */}
      <FooterContent />
    </>
  );
}

export default App;
