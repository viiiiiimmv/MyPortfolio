import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import "./App.css";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import FooterContent from "./components/FooterContent";
import Stats from "./components/Stats";
import CustomCursor from "./components/CustomCursor";
import HomeLoader from "./components/HomeLoader";
import BackgroundAudio from "./components/BackgroundAudio";
import ProjectPanel from "./components/ProjectPanel";
import useIsMobile from "./hooks/useIsMobile";
import MobileOutro from "./components/MobileOutro";
import MobileFooterSection from "./components/MobileFooterSection";
import Terminal from "./assets/Terminal.jsx";

const MonochromeDepth = lazy(() => import("./components/MonochromeDepth"));

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const volume = 0.5;
  const [isMuted, setIsMuted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 7000);

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
      <AnimatePresence mode="wait">
        {showLoader ? (
          <Motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
          >
            <HomeLoader />
          </Motion.div>
        ) : (
          <Motion.div
            key="site"
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.35 } }}
          >
            {isMobile ? null : (
              <Suspense fallback={null}>
                <MonochromeDepth />
              </Suspense>
            )}
            {isMobile ? null : <CustomCursor />}
            <div className="global-grid-overlay" aria-hidden="true" />
            {isMobile ? null : (
              <div className="global-spotlight-overlay" aria-hidden="true" />
            )}
            <Hero isMuted={isMuted} setIsMuted={setIsMuted} />
            <Terminal />
            {isMobile ? <ProjectPanel /> : <Projects />}
            {isMobile ? <MobileOutro /> : <Stats />}
            {isMobile ? <MobileFooterSection /> : <FooterContent />}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
